//https://chatgpt.com/share/6874f51e-1bac-8004-9aff-c098a6205f5a
describe('User Sign In Flow', () => {
  it('should sign in user and redirect to dashboard', () => {
    cy.visit('http://localhost:5173/user/signIn');

    cy.get('input[name="email"]').type('zahiduzman75@gmail.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button[type="submit"]').click();
  });
});
