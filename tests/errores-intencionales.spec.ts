import { test, expect } from '@playwright/test';

// Pruebas que FALLAN A PROPÓSITO para estudiar los mensajes de error.
// Ejecútalas con:  npm run test:laboratorio

test.describe('Laboratorio de errores @laboratorio', () => {
  
test('E1 - el elemento no existe (timeout)', async ({ page }) => {
  await page.goto('/catalogo.html');

  await expect(page.getByTestId('producto')).toHaveCount(4);

  const teclado = page.getByTestId('producto')
    .filter({ hasText: 'Teclado mecánico' });

  await teclado.getByRole('button', {
    name: 'Agregar al carrito'
  }).click();

  await expect(page.getByTestId('contador-carrito')).toHaveText('1');
});


  
test('E2 - el locator encuentra varios elementos (strict mode)', async ({ page }) => {
  await page.goto('/catalogo.html');

  await expect(page.getByTestId('producto')).toHaveCount(4);

  const mouse = page.getByTestId('producto')
    .filter({ hasText: 'Mouse inalámbrico' });

  await mouse.getByRole('button', {
    name: 'Agregar al carrito'
  }).click();

  await expect(page.getByTestId('contador-carrito')).toHaveText('1');
});


 
test('E3 - el texto no coincide (Expected vs Received)', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { level: 1 })
  ).toHaveText('Bienvenido a TiendaUT');
});


  
test('E4 - la URL no es la esperada', async ({ page }) => {
  await page.goto('/login.html');

  await page.getByLabel('Usuario').fill('alumno');
  await page.getByLabel('Contraseña').fill('utvm2026');

  await page.getByRole('button', {
    name: 'Entrar'
  }).click();

  await expect(page).toHaveURL(/catalogo\.html/);

  await expect(
    page.getByRole('heading', { name: 'Catálogo' })
  ).toBeVisible();
});

 
test('E5 - el servidor no está levantado', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('TiendaUT');

  await expect(
    page.getByRole('heading', { level: 1 })
  ).toHaveText('Bienvenido a TiendaUT');
});


  test('E6 - el sitio lanza un error de JavaScript', async ({ page }) => {
    const errores: string[] = [];
    page.on('pageerror', (error) => errores.push(error.message));

    await page.goto('/catalogo.html');
    await page.getByRole('button', { name: 'Vaciar carrito' }).click();

    expect(errores).toEqual([]);
  });

  
test('E7 - olvidé el await', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', {
      name: 'Bienvenido a TiendaUT'
    })
  ).toBeVisible();
});



test('E8 - getByLabel sobre un campo sin etiqueta', async ({ page }) => {
  await page.goto('/catalogo.html');

  const buscar = page.getByPlaceholder('Buscar producto');

  await buscar.fill('mouse');

  await expect(buscar).toHaveValue('mouse');

  await expect(
    page.getByTestId('producto')
  ).toHaveCount(1);

  await expect(
    page.getByTestId('producto').first()
  ).toContainText('Mouse inalámbrico');
});

});
