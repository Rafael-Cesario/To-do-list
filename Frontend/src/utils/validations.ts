export class Validations {
  email(email: string) {
    if (!email.includes('@')) return 'Email incorreto: Seu email não é valido';

    const [user, domain] = email.split('@');
    if (!user) return 'Email incorreto: Esta faltando algo antes do seu @';
    if (!domain) return 'Email incorreto: Esta faltando algo depois do seu @';
  }
}
