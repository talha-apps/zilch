import { device, element, by, expect } from 'detox';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Should show loading indicator whilst attempting to fetch transactions', async () => {
    await expect(element(by.id('transaction-list'))).not.toBeVisible();
    await expect(element(by.id('loading-indicator'))).toBeVisible();
  });

  it('should show control button and list after transactions loaded', async () => {
    await waitFor(element(by.id('transaction-list'))).toBeVisible().withTimeout(10000)
    await expect(element(by.id('loading-indicator'))).not.toBeVisible();
    await expect(element(by.text('Filter: ALL'))).toBeVisible();
    await expect(element(by.text('Sort: NONE'))).toBeVisible();
  });
});
