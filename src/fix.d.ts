declare module 'asymmetric-crypto' {
  function keyPair(): {
    secretKey: string,
    publicKey: string,
  }

  function fromSecretKey(key: string): {
    secretKey: string,
    publicKey: string,
  }

  function encrypt(data: string, publicKey: string, secretKey: string): {
    data: string,
    nonce: string,
  }

  function decrypt(data: string, nonce: string, publicKey: string, secretKey: string): string

  function sign(message: string, secretKey: string): string

  function verify(message: string, signature: string, publicKey: string): boolean
}
