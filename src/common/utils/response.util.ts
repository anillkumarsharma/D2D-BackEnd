export const successResponse = (
  message: string,
  data: any = null,
) => ({
  success: true,
  message,
  data,
});
