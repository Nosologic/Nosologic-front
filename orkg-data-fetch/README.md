# ORKG → GraphData (Module 1, refactor)

- **Circles** are fetched from ORKG class **C123035** (“class of disease”), so even empty circles are present.
- **Nodes** get `classIds` from the comparison rows “Disease class” and “Disease class (ancestral)”. 
- **Edges** point ancestral → disease and are aggregated.

## Run

```powershell
npm i
npm run build
# smoke test
npm test

# write viewer files into another repo (adjust path)
node .\scripts\bridge.mjs http://orkg.org/orkg/resource/R1559162 ..\sequela-mini\public\data
```
