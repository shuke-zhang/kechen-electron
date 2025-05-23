
export function testApi() { }
export function getCodeImg() {
  return request.get<{ img: string, uuid: string }>({
    url: '/prod-api/captchaImage',
    withToken: false,
  });
}
