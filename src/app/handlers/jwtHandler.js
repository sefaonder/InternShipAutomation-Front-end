const parseJWT = (token) => {
  try {
    // JWT'yi '.' karakterine göre bölerek parçalıyoruz
    const [header, payload, signature] = token.split('.');

    // Base64 encoded olan payload'u decode ediyoruz
    const decodedPayload = atob(payload);

    // JSON parse ederek payload verilerine erişiyoruz
    const payloadData = JSON.parse(decodedPayload);

    // Örneğin kullanıcı adını ve rolünü alıyoruz
    const userId = payloadData.UserInfo.id || '';
    const roles = payloadData.UserInfo.roles || '';
    const parsedData = { userId: userId, roles: roles };

    return parsedData;

    // Kullanıcı adı ve rolü console'da gösteriyoruz
  } catch (error) {
    console.error('JWT parse edilirken bir hata oluştu:', error);
  }
};

export default parseJWT;
