# Yusr Duty/Taxes Calculator v2

> A browser-based calculator for Pakistan Customs duty and tax assessment, audit comparison, GST calculation, printable assessment sheets, and locally saved calculation history.

**Developed by ALiRao, Appraising Officer**  
Contact: [muhammadalicustoms@gmail.com](mailto:muhammadalicustoms@gmail.com)

## Live Demo

**Coming soon.** Add the GitHub Pages URL here after deployment.

<!-- Replace the line above with: [Open the live calculator](YOUR_LIVE_DEMO_URL) -->

## Screenshot

**Screenshot placeholder — add a project screenshot before publishing.**

<!-- Add screenshot.png to the repository, then replace the line above with: ![Yusr Duty/Taxes Calculator v2](screenshot.png) -->

## Project Overview

Yusr Duty/Taxes Calculator is a single-page browser tool designed to simplify calculation-heavy customs assessment work. It calculates import value, duties, and taxes; compares paid and audited assessments levy by levy; performs GST calculations on a retail-price basis; and produces a printable A4 assessment sheet.

Version 2 adds a practical Save & History workflow. Users can save, reopen, print, and manage up to 20 complete calculations in their browser without a server, database, installation, or account.

## Key Features

- Fetches CD, ACD, RD, FED and Sales Tax rates from Pakistan Customs Tariff 2026-27 by PCT heading, with every rate still editable
- Calculates import value in foreign currency and PKR
- Calculates CD, ACD, RD, FED, ADD, ST, AST, IT, and a configurable Other levy
- Compares paid and audited assessments levy by levy
- Identifies **Short levy**, **Excess paid**, or **NIL** differences
- Calculates GST using the applicable 130% or 110% uplift option
- Adds GST to the relevant main calculation sheet when selected
- Saves and restores up to 20 complete calculations
- Loads, prints, or deletes saved records from History
- Generates a one-page A4 assessment sheet suitable for printing or saving as PDF
- Runs entirely in a modern web browser

## What's New in v2

- Save up to 20 calculations in browser local storage
- Automatic GD-based names, with support for custom names
- Restore entered values, selected options, audit state, GST settings, and the active panel
- View saved date and time for each history entry
- Load, print, or delete individual saved calculations
- Confirm before overwriting an entry with the same name
- Confirm before replacing the oldest entry when history is full

## How to Use

For GitHub publication, rename the calculator file to **`index.html`**. This standard filename also makes deployment with GitHub Pages straightforward.

1. Download or clone the repository.
2. Open `index.html` in Chrome, Edge, or another modern browser.
3. Enter the GD number in the highlighted field beside **Duty/Tax Calculation Sheet of GD No.**
4. Enter the invoice or assessed value. Freight is treated as already included and is not added again.
5. Choose insurance as either 1% of invoice value or a fixed foreign-currency amount.
6. Choose landing charges as either 1% of invoice value plus insurance, or a fixed foreign-currency amount.
7. Enter the exchange rate and applicable duty and tax rates.
8. Use Audit, GST Calculation, Save, History, or Print as required.

### Data Entry Notes

- Type values directly into the number fields; spinner arrows are hidden.
- Press **Enter** or **Tab** to move to the next field.
- An empty field is treated as zero.
- Clicking a field displaying zero clears it for entry.

## Calculation Logic

### Import Value

```text
Import Value (FC) = Invoice or Assessed Value + Insurance + Landing Charges
Import Value (PKR) = Import Value (FC) × Exchange Rate
```

### Duties and Taxes

- **Customs Duty (CD), Additional Customs Duty (ACD), Regulatory Duty (RD), and Federal Excise Duty (FED)** are charged on the import value in PKR.
- **Anti-Dumping Duty (ADD)** is charged on the import value and included in the total, but it is excluded from the sales-tax and income-tax bases.
- **Sales Tax (ST) and Additional Sales Tax (AST)** use the following base:

```text
ST/AST Base = Import Value + CD + ACD + RD + FED
```

- **Income Tax (IT)** uses the following base:

```text
IT Base = Import Value + CD + ACD + RD + FED + ST + AST
```

- **Other** can be given a custom name and charged on the duty base, sales-tax base, or income-tax base.

> CESS, stamp duty, and other provincial charges are outside this calculator's core assessment.

## PCT Heading Lookup (Tariff 2026-27)

Enter an 8-digit PCT heading (with or without the dot, e.g. `3102.1000` or `31021000`) in the **PCT heading** field and select **Fetch rates** (or press Enter).

- Fills **CD, ACD, RD, FED and Sales Tax** in the Paid calculation and recalculates at once.
- Every fetched rate stays editable. Edited rates turn amber and a "Changed from tariff" line lists the original tariff rates, so a claimed exemption or concession can be applied. **Reset to tariff** restores them.
- In Audit Mode, the **Audited calculation** tab has its own **PCT heading for audit** field, for cases where the audit finds a different heading. It fills the audited rates only; the paid rates stay fixed. Both headings are saved in History, and the audited heading is shown on the printed audit sheet.
- **ADD, AST, IT and Other** are never changed by the lookup.
- Warnings appear for headings where the tariff data needs manual input or checking: specific (per-unit) duties, missing or unclear CD/RD, FED charged on retail price or per unit, conditional sales tax (marked `*`), and Import Policy Order banned/restricted entries.
- The PCT heading is saved with History records and shown on the printed sheet.

**Files:** keep `tariff-2026-27.js` and `pct-lookup.js` in the same folder as `index.html`. If they are missing, the calculator works as before and shows a message when Fetch is used.

The tariff data was extracted from a reference PDF (hscodepakistan.com) and may contain errors. Verify rates against the official Customs Tariff and applicable SROs.

## Audit Mode

Select **Audit off** to enable Audit Mode. The control turns green and displays **Audit on**, while the paid duty and tax figures are locked.

- **Tab 2** retains the paid calculation.
- **Tab 3** recalculates the assessment using revised rates shown beside the paid amounts.
- **Tab 4** displays the levy-wise difference as **Short levy**, **Excess paid**, or **NIL**.

Select the control again to turn Audit Mode off and resume editing the paid calculation.

## GST Calculation

Open **GST calculation**, then choose the retail-price status and source of figures.

### Retail-Price Option

- **Not declared:** applies an uplift of 1.3 (130%).
- **Declared:** applies an uplift of 1.1 (110%).

### Source of Figures

- **Paid calculation:** uses import value, duties/taxes, and the ST rate from the paid sheet.
- **Audited calculation:** uses the corresponding figures from the audited sheet; Audit Mode must be on.
- **Manual input:** accepts import value, total duties/taxes, paid ST, paid AST, and the ST rate in PKR.

### Formula

```text
GST = (((Import Value + All Duties and Taxes) − Paid ST − Paid AST)
       × Uplift × ST Rate)
      − Paid ST − Paid AST
```

"All Duties and Taxes" includes every amount in the total. Paid ST and AST are then deducted as shown in the formula. Negative results remain visible as negative values.

### Include GST in the Main Sheet

For a Paid or Audited calculation, select **Include GST in the main calculation sheet**. A **GST** row is inserted between Additional Sales Tax and Income Tax, the rate is shown as **Fixed**, and the GST amount is added to the total. GST is added only to the sheet used as its source.

## Save & History

1. Select **Save this calculation** in the top toolbar.
2. Accept the suggested name—`Duty-Tax Calculation of <GD No.>`—or enter a custom name. Without a GD number, the default is `Untitled calculation`.
3. Press **Enter** or select **Save**. Press **Esc** to cancel.

Each record preserves the complete working state, including:

- GD number and entered fields
- Paid and audited values
- Selected options and rates
- Audit on/off state
- GST source, retail-price choice, include-GST setting, and manual inputs
- The panel that was open when the record was saved

Open **History** to view up to 20 records, newest first. Each entry shows its saved date and time and provides **Load**, **Print**, and **Delete** actions. Selecting an entry's name also loads it.

If a name is reused, the calculator asks before overwriting the existing record. If 20 records already exist, saving another asks whether to replace the oldest.

## Print / PDF

Select **Print** to generate a one-page A4 assessment sheet containing:

- Calculator title and developer details
- GD number
- Value facts and the duty/tax table
- Audit and GST details when used
- GST basis when GST is included in the main sheet or Manual input is used

For Manual GST, the printout contains only the GST calculation. To create a PDF, choose **Save as PDF** in the browser's print dialog. The suggested filename is:

```text
Duty-Tax Calculation of <GD No.>
```

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- Browser Web Storage API (`localStorage`)
- No external framework, server, or database required

## Privacy and Storage

Saved calculations remain in the browser's local storage on the device where they were created. They are not uploaded, synced to another device, or stored in an external database.

Clearing browser data, using a different browser or device, or restricting local storage may make saved records unavailable or permanently remove them. Use the Print/PDF option for records that need to be retained outside the browser.

## Disclaimer

This tool is intended to assist with professional calculations and workflow. It does not constitute legal, tax, tariff, valuation, or customs advice. Users should independently verify tariff classifications, statutory rates, exemptions, valuation rules, tax treatment, and calculated results against the applicable laws, notifications, and official customs systems for each transaction.

