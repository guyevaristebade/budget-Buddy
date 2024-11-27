// @ts-check
import { test, expect } from "@playwright/test";

test("inscription", async ({ page }) => {
  await page.getByRole("link", { name: "Inscription" }).click();
  await page.getByPlaceholder("Username").click();
  await page.getByPlaceholder("Username").fill("taio3");
  await page.getByPlaceholder("Username").press("Tab");
  await page.getByPlaceholder("Password", { exact: true }).fill("Taio12345!");
  await page.getByPlaceholder("Password", { exact: true }).press("Tab");
  await page.getByPlaceholder("Confirm Password").fill("Taio12345!");
  await page.getByRole("button", { name: "Register" }).click();
  await expect(page.getByText("Bonjour, taio3")).toBeVisible();
});

test("connexion au site web avec identifiants", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.goto("http://localhost:3000/login");
  await page.getByPlaceholder("Username").click();
  await page.getByPlaceholder("Username").fill("taio5");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill("Adem12345!");
  await page.getByRole("button", { name: "Log in" }).click();
  await expect(page.getByText("Bonjour, taio2")).toBeVisible();
});

test("déconnexion", async ({ page }) => {
  await page.getByRole("banner").locator("span").first().click();
  await page.getByText("Déconnexion").click();
});

test("supprimer un compte", async ({ page }) => {
  await page.getByRole("link", { name: "Paramètres utilisateurs" }).click();
  await expect(
    page.getByRole("heading", { name: "Suppression du compte" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Supprimer son compte" }).click();
  await page.getByRole("button", { name: "OK" }).click();
  await expect(page.getByRole("heading", { name: "Register" })).toBeVisible();
});

test("creation room", async ({ page }) => {
  await page.getByPlaceholder("Entrez le nom de votre piece ").click();
  await page
    .getByPlaceholder("Entrez le nom de votre piece ")
    .fill("nouvellePiece");
  await page.getByPlaceholder("Entrez le nom de votre piece ").press("Enter");
  await page.getByRole("link", { name: "nouvellePiece" }).click();
});

test("changer le nom d une piece", async ({ page }) => {
  await page.getByPlaceholder("Entrez le nom de votre piece ").click();
  await page
    .getByPlaceholder("Entrez le nom de votre piece ")
    .fill("nouvellePiece");
  await page.getByPlaceholder("Entrez le nom de votre piece ").press("Enter");
  await page.getByRole("link", { name: "nouvellePiece" }).click();
});

test("Ajouter un item", async ({ page }) => {
  await page.getByRole("link", { name: "piece", exact: true }).click();
  await page.getByRole("button", { name: "plus Ajouter un objet" }).click();
  await page
    .getByRole("button", {
      name: "inbox Click or drag file to this area to upload (Image)",
    })
    .click();
  await page
    .getByRole("button", {
      name: "inbox Click or drag file to this area to upload (Image)",
    })
    .setInputFiles("ch1.png");
  await page.getByLabel("Marque").click();
  await page.getByLabel("Marque").fill("toto");
  await page.getByLabel("Modèle").fill("aaa");
  await page.getByLabel("Prix").click();
  await page.getByLabel("Prix").fill("200");
  await page.getByPlaceholder("Select date").click();
  await page.getByText("22").click();
  await page.getByLabel("Lien").click();
  await page.getByLabel("Lien").fill("http://localhost:3000");
  await page.getByLabel("Description").click();
  await page.getByLabel("Description").fill("aaa");
  await page
    .getByRole("button", {
      name: "inbox Click or drag file to this area to upload (PDF)",
    })
    .click();
  await page
    .getByRole("button", {
      name: "inbox Click or drag file to this area to upload (PDF)",
    })
    .setInputFiles("playwright.pdf");
  await page.getByRole("button", { name: "Submit" }).click();
});

test("supprimer un item", async ({ page }) => {
  await page.getByRole("button", { name: "delete" }).click();
  await page.getByRole("button", { name: "Oui" }).click();
});
