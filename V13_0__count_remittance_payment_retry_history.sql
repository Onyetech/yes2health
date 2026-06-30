-- CREATE STORED PROCEDURE count_remittance_payment_retry_history_by_remittance_payment_id
IF EXISTS(SELECT
*
FROM sys.objects
WHERE object_id = OBJECT_ID(N'count_remittance_payment_retry_history_by_remittance_payment_id') AND type IN (N'P', N'PC'))
DROP PROCEDURE count_remittance_payment_retry_history_by_remittance_payment_id
GO
CREATE PROCEDURE count_remittance_payment_retry_history_by_remittance_payment_id
                  @remittance_payment_id BIGINT
AS
BEGIN
SET NOCOUNT ON

   SELECT count(*) as [count] from [dbo].[remittance_payments_retry_history] (NOLOCK) WHERE remittance_payment_id = @remittance_payment_id

END
GO
