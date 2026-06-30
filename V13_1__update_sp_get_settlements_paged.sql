USE [ipg_settlement_fulfilment_uat]
GO
/****** Object:  StoredProcedure [dbo].[sp_get_settlements_paged]    Script Date: 24/06/2026 18:35:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[sp_get_settlements_paged]
    @page_number INT = 1,
    @page_size INT = 10,
    @start_date DATETIME,
    @end_date DATETIME,
    @status VARCHAR(50) = NULL,
    @account_number VARCHAR(50) = NULL,
    @merchant_code VARCHAR(50) = NULL,
    @payment_reference VARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Calculate total count with the same filters
    SELECT COUNT(*) AS total_count
    FROM [dbo].[remittance_payments]
    WHERE 
        [settlement_date] BETWEEN @start_date AND @end_date
        AND (@status IS NULL OR @status = '' OR [status] = @status)
        AND (@account_number IS NULL OR @account_number = '' 
            OR [remittance_account_no] = @account_number 
            OR [payer_account_no] = @account_number)
        AND (@merchant_code IS NULL OR @merchant_code = '' OR [merchant_code] = @merchant_code)
        AND (@payment_reference IS NULL OR @payment_reference = '' OR [payment_reference] = @payment_reference);
    
    -- Calculate offset
    DECLARE @offset INT = (@page_number - 1) * @page_size;
    
    -- Get paginated results with retry count
    SELECT 
        rp.[id],
        rp.[payment_reference],
        rp.[amount],
        rp.[merchant_code],
        rp.[response_code],
        rp.[batch_id],
        rp.[remittance_account_no],
        rp.[remittance_account_type],
        rp.[remittance_bank_code],
        rp.[payer_account_no],
        rp.[remittance_type],
        rp.[status],
        rp.[type],
        rp.[settlement_narration],
        rp.[processor],
        rp.[batch_type],
        rp.[settlement_date],
        rp.[currency_code],
        rp.[retry_payment_reference],
        rp.[merchant_id],
        rp.[refund_id],
        ISNULL(rh.retry_count, 0) AS retry_count
    FROM [dbo].[remittance_payments] rp
    LEFT JOIN (
        SELECT remittance_payment_id, COUNT(*) AS retry_count
        FROM [dbo].[remittance_payments_retry_history] (NOLOCK)
        GROUP BY remittance_payment_id
    ) rh ON rp.[id] = rh.[remittance_payment_id]
    WHERE 
        rp.[settlement_date] BETWEEN @start_date AND @end_date
        AND (@status IS NULL OR @status = '' OR rp.[status] = @status)
        AND (@account_number IS NULL OR @account_number = '' 
            OR rp.[remittance_account_no] = @account_number 
            OR rp.[payer_account_no] = @account_number)
        AND (@merchant_code IS NULL OR @merchant_code = '' OR rp.[merchant_code] = @merchant_code)
        AND (@payment_reference IS NULL OR @payment_reference = '' OR rp.[payment_reference] = @payment_reference)
    ORDER BY rp.[settlement_date] DESC
    OFFSET @offset ROWS
    FETCH NEXT @page_size ROWS ONLY;
END 
