# ICIV — Intensive Care Information & Visualization

**ICIV** (Intensive Care Information & Visualization) is an open-source platform designed to empower ICU teams with accessible, extensible, and reliable tools for safer care and smarter decisions.

## Modules

### Module 1: IV Compatibility Matrix

- Interactive compatibility visualization
- Data-driven from `data/CompatibilityMatrix.csv`
- Grouped drug categories (Sedation, Inotropic, Others)
- Dropdown selection with cross-highlighting
- Hover crosshair effect
- Color-coded compatibility:
  - **Y** Compatible
  - **N** Incompatible
  - **!** Variable Results
  - **?** No Data
  - **-** Same Drug
- Metadata (last updated, sources)

### Module 2: Drug Quick Sheet

- JSON-driven drug reference from `data/DrugInfo.json`
- Dynamic tabs for each drug
- Displays:
  - Generic and brand names
  - Mechanism of action
  - Indications
  - Dosing
  - Adverse effects
  - Monitoring
  - Contraindications & cautions
  - Sources
- Color-coded categorization:
  - Vasopressors (red)
  - Sedatives (blue)
  - Opioids (green)
  - Neuromuscular Blockers (purple)
  - Reversal Agents (orange)
  - Vasodilators (teal)
  - Anticoagulants (gray)

### Live Demo: <https://Brritany.github.io/ICIV/>
