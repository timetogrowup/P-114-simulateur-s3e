# Suivi GitHub Actions — 19 novembre 2026

## Incident

- Exécutions concernées :
  - [Tests qualité](https://github.com/timetogrowup/P-114-simulateur-s3e/actions/runs/44387802205)
  - [Recette quotidienne](https://github.com/timetogrowup/P-114-simulateur-s3e/actions/runs/44303147910)
- Cause réelle : Playwright ne fournit pas les navigateurs attendus sur l’image GitHub Actions Ubuntu 26 utilisée par `ubuntu-latest`.
- Correction : épinglage des deux workflows sur `ubuntu-24.04`.
- Commit : [358ef5c](https://github.com/timetogrowup/P-114-simulateur-s3e/commit/358ef5c0ac83dc4e7dc3868e8bfedb4c8da41b16).

## Confirmation

- [Tests qualité réussis](https://github.com/timetogrowup/P-114-simulateur-s3e/actions/runs/44423007717).
- [Recette quotidienne réussie](https://github.com/timetogrowup/P-114-simulateur-s3e/actions/runs/44423007458).
- [Publication Pages réussie](https://github.com/timetogrowup/P-114-simulateur-s3e/actions/runs/44423007202).

État : **résolu**.
