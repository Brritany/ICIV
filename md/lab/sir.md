# 細菌培養報告與抗菌藥物感受性 (Antimicrobial Susceptibility Testing, AST)

## 定義 (Definition)

- **抗菌藥物感受性試驗 (AST)**：透過實驗室方法測定細菌對各種抗菌藥物的敏感性，用於指導臨床抗生素治療。  
- 報告形式通常以 **SIR** 或 **MIC** 顯示。  

---

## SIR 解釋 (S, I, R Categories)

- **S (Susceptible / 易感受)**  
  - 細菌在標準劑量下對抗生素敏感，治療可能有效。  
- **I (Intermediate / 中介或劑量依賴性敏感)**  
  - 細菌對藥物反應介於敏感與抗藥之間。  
  - 臨床上可能需要 **較高劑量** 或 **藥物集中於感染部位** 才有效。  
- **R (Resistant / 抗藥)**  
  - 細菌對抗生素不敏感，即使使用標準劑量治療通常無效。  

> 📌 註：自 2019 年起，CLSI 將 I 的定義改為 **「Susceptible, Increased exposure」**，意指在增加劑量或延長輸注時間下仍可能有效。  

---

## MIC (Minimum Inhibitory Concentration, 最低抑菌濃度)

- **定義**：抑制細菌可見生長的最低抗菌藥物濃度（通常以 μg/mL 表示）。  
- **臨床判讀**：  
  - 將 MIC 值與標準化斷點 (breakpoints, CLSI/EUCAST) 比較，決定屬於 S、I 或 R。  
  - 例：某菌株對 Ceftriaxone 的 MIC = 0.5 μg/mL；若 CLSI 斷點為 S ≤1 μg/mL，則此菌屬於 **S**。  

---

## 臨床應用 (Clinical Application)

1. **抗生素選擇**：依 AST 報告挑選最合適藥物。  
2. **劑量調整與 MIC 建議值**：  
   - **Ceftriaxone**：MIC ≤1 μg/mL → S；若 MIC 接近 1，建議足量使用。  
   - **Piperacillin-tazobactam**：MIC ≤16 μg/mL → S；接近 16 時建議延長輸注。  
   - **Carbapenems (Meropenem, Imipenem)**：MIC ≤1 μg/mL → S；若 MIC=2，考慮高劑量/延長輸注。  
   - **Vancomycin (針對 MRSA)**：MIC ≤2 μg/mL 為 S，但 MIC ≥2 時臨床治療失敗率升高，建議改用 Linezolid 或 Daptomycin。  
   - **Aminoglycosides (Gentamicin, Amikacin)**：需達 **Cmax/MIC ≥8–10** 才有效。  
3. **感染管制**：高比例 R 報告提示可能的耐藥菌株流行，需加強院內感染控制。  
4. **藥物監測結合 (TDM)**：部分抗菌劑（如 Aminoglycosides, Vancomycin）需同時考慮血中濃度與 MIC，確保 **AUC/MIC 或 Cmax/MIC** 比值達到治療效果。  

---

## 報告範例 (Example Report)

科室: A6 No: 250901038737 **檢體: BLOOD (CVP)**  
採檢: 2025/09/01 17:48 登入: 2025/09/01 18:51 最後報告: 2025/09/06 11:32  
顯示藥敏試驗｜電子病歷  

**Blood Culture #1**: Staphylococcus capitis - Time To Positive: 85.23 hrs  

| Antibiotic | S/I/R | MIC (μg/mL) | Note |
|------------|-------|-------------|------|
| CC: Clindamycin | R | ≥4 | |
| CIP: Ciprofloxacin | R | ≥8 | |
| DAP: Daptomycin | S | 1 | |
| E: Erythromycin | R | ≥8 | |
| FA: Fusidic acid | R | 16 | |
| GM: Gentamicin 10 μg | R | ≥16 | |
| LVX: Levofloxacin | R | 4 | |
| LZD: Linezolid | S | 2 | |
| OX: Oxacillin | R | ≥4 | |
| SXT: Trimethoprim/sulfamethoxazole | S | 20 | |
| TE: Tetracycline | R | ≥16 | |
| VA: Vancomycin | S | ≤0.5 | |

> **臨床提示**：請參考藥敏結果調整抗生素。  

**註解**  

- S: Susceptible  
- I: Intermediate  
- R: Resistant  
- SDD: Susceptible-dose dependent  
- WT: Wild type  
- non-WT: non-wild type  
- 空白: 沒有判讀標準  
- Cefazolin (urine): 適用於單純性泌尿道感染  
- Cefazolin (others): 適用於其他感染  

---

## 總結 (Summary)

- **AST** 是感染治療的重要依據。  
- **SIR 分類** 幫助快速解讀抗菌藥物有效性。  
- **MIC** 提供更精確數據，須結合標準斷點與臨床劑量評估。  
- 報告判讀應綜合 **感染部位、藥代動力學/藥效學 (PK/PD)** 與 **病人體況**，而非僅依數值決定。  

---

## 參考文獻 (References)

1. Clinical and Laboratory Standards Institute (CLSI). Performance Standards for Antimicrobial Susceptibility Testing. CLSI supplement M100. 33rd ed. Wayne, PA: CLSI; 2023.  
2. European Committee on Antimicrobial Susceptibility Testing (EUCAST). Breakpoint tables for interpretation of MICs and zone diameters. Version 13.0, 2023. Available at: https://www.eucast.org.  
3. Rybak MJ, Le J, Lodise TP, et al. Therapeutic monitoring of vancomycin for serious methicillin-resistant Staphylococcus aureus infections: A revised consensus guideline. *Am J Health Syst Pharm*. 2020;77(11):835-864. doi:10.1093/ajhp/zxaa036.  
