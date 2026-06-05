import { test, expect } from '@playwright/test';

test('botones dígitos', async ({ page }) => {
  await page.goto('/chisme/de/hacer/numeros');
  await page.getByRole('button', { name: '9' }).click();
  await page.getByRole('button', { name: '8' }).click();
  await page.getByRole('button', { name: '7' }).click();
  await page.getByRole('button', { name: '6' }).click();
  await page.getByRole('button', { name: '5' }).click();
  await page.getByRole('button', { name: '4' }).click();
  await page.getByRole('button', { name: '3' }).click();
  await page.getByRole('button', { name: '2' }).click();
  await expect.soft(page.locator('calculadora')).toContainText('98765432');
  await page.getByRole('button', { name: '.' }).click();
  await page.getByRole('button', { name: '0' }).click();
  await page.getByRole('button', { name: '1' }).click();
  await page.getByRole('button', { name: '±' }).click();
  await expect(page.locator('calculadora')).toContainText('-98765432.01');
});
test('Operadores', async ({ page }) => {
  await page.goto('/chisme/de/hacer/numeros');

  await page.getByRole('button', { name: '+' }).click();
  await expect(page.locator('calculadora')).toContainText('0 +');
  await page.getByRole('button', { name: '3' }).click();
  await page.getByRole('button', { name: '-' }).click();
  await expect(page.locator('calculadora')).toContainText('3 -');
  await page.getByRole('button', { name: '2' }).click();
  await page.getByRole('button', { name: '*' }).click();
  await expect(page.locator('calculadora')).toContainText('1 *');
  await page.getByRole('button', { name: '3' }).click();
  await page.getByRole('button', { name: '/' }).click();
  await expect(page.locator('calculadora')).toContainText('3 /');
  await page.getByRole('button', { name: '6' }).click();
  await page.getByRole('button', { name: '=' }).click();
  await expect(page.locator('calculadora')).toContainText('0.5');
});
