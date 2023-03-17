export class Validations {
  email(email: string) {
    if (!email.includes('@')) return 'Seu email não é valido';

    const [user, domain] = email.split('@');
    if (!user) return 'Seu email não é valido';
    if (!domain) return 'Seu email não é valido';
  }

  name(name: string) {
    if (name.length > 30) return 'Seu nome é muito longo';
  }

  password(password: string) {
    if (password.length < 10) return 'Sua senha é muito curta';
    if (!password.match(/[a-z]/)) return 'Sua senha deve conter ao menos uma letra minúscula';
    if (!password.match(/[A-Z]/)) return 'Sua senha deve conter ao menos uma letra maiúscula';
    if (!password.match(/[0-9]/)) return 'Sua senha deve conter ao menos um número';
  }

  confirmPassword(confirmPassword: string, password: string) {
    if (confirmPassword !== password) return 'Suas senhas não são iguais';
  }
}
