# Yusr Duty/Taxes Calculator By ALiRao

A browser calculator for Pakistan Customs core assessment. It works out import value, duties and taxes, compares the paid assessment with an audited assessment, and calculates GST on retail-price basis.

Developed by ALiRao, Appraising Officer (muhammadalicustoms@gmail.com).

## How to use

1. Open `Yusr-Duty-Taxes-Calculator-GST.html` in a browser (Chrome or Edge recommended).
2. Type the GD number in the highlighted box beside "Duty/Tax Calculation Sheet of GD No.".
3. Enter the invoice or assessed value. Freight is already included and is not added again.
4. Choose insurance: 1% of the invoice value, or a fixed foreign-currency amount.
5. Choose landing charges: 1% of (invoice + insurance), or a fixed foreign-currency amount.
6. Enter the exchange rate and the duty and tax rates.

### Data entry

- Boxes have no up/down arrows; type the value directly.
- Press **Enter** or **Tab** to move to the next box.
- A box left empty counts as 0. Clicking a box that shows 0 clears it.

## Calculation

- Import value (FC) = invoice or assessed value + insurance + landing charges
- Import value (PKR) = import value (FC) × exchange rate
- Customs duty, additional customs duty, regulatory duty and federal excise duty are charged on the import value in PKR
- Anti-dumping duty is charged on the import value and added to the total, but is not in the sales-tax or income-tax base
- Sales tax and additional sales tax = (import value + CD + ACD + RD + FED) × rate
- Income tax = (import value + those duties + sales tax + additional sales tax) × rate
- Other can be named and charged on the duty base, the sales-tax base, or the income-tax base

## Audit

Click **Audit off**. It turns green and reads **Audit on**, and the paid duty and taxes are locked.

- Tab 2 keeps the paid figures
- Tab 3 recalculates with the revised rates beside the paid amounts
- Tab 4 shows the levy-wise difference: **Short levy**, **Excess paid**, or **NIL**

Click again to turn audit off and edit the paid calculation.

## GST calculation

Click **GST calculation**.

1. **Retail price declared?** Not declared uses an uplift of 1.3; declared uses 1.1.
2. **Source of figures:**
   - **Paid calculation** – import value, duties/taxes and ST rate from the paid sheet
   - **Audited calculation** – the same from the audited sheet (Audit must be on)
   - **Manual input** – enter import value, total duty/taxes, paid sales tax, paid additional sales tax and sales-tax rate (all PKR)

Formula:

GST = (((Import value + all duty and taxes) − Paid ST − Paid AST) × uplift × ST rate) − Paid ST − Paid AST

"All duty and taxes" includes everything in the total; ST and AST are then taken out as the formula shows. Negative results are shown as negative.

### Include GST in the main sheet

For Paid or Audited, tick **Include GST in the main calculation sheet**. A **GST** row is added between Additional Sales Tax and Income Tax, its rate column shows **Fixed**, and the amount is added to the total. GST goes only on the sheet its figures came from (paid or audited).

## Print and PDF

**Print** produces one A4 sheet with:

- Yusr Duty/Taxes Calculator By ALiRao
- Appraising Officer (muhammadalicustoms@gmail.com)
- Duty/Tax Calculation Sheet of GD No. … (bold, Times New Roman 16)
- The value facts and the duty/tax table (with audit and GST when used)
- The GST section, naming its basis (Paid, Audited or Manual)

With **Manual** GST, the print shows only the GST calculation.

When saving as PDF, the suggested file name is **Duty-Tax Calculation of <GD No.>**.

## Not included

CESS, stamp duty and other provincial charges are outside this core assessment.
