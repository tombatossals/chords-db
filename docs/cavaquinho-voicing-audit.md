# Auditoria de voicings do cavaquinho

Execute `npm run audit:cavaquinho` para gerar um relatório JSON completo e
reproduzível. Cada shape informa fretes, MIDI, notas tocadas, omissões, notas
adicionais, duplicações e possíveis equivalências.

## Política

- `complete`: contém todas as notas da fórmula e nenhuma nota externa.
- `incomplete`: não contém notas externas e preserva os tons essenciais; a
  omissão da raiz só é aceita pelas políticas explícitas de extensão.
- `additional`: contém ao menos uma nota fora da fórmula e não pode alimentar
  aliases automáticos.
- `invalid`: não contém notas externas, mas omite um tom essencial.

Os shapes publicados explicitamente como `dim` e `dim7` continuam disponíveis,
mas qualquer shape com notas adicionais fica apenas no relatório para revisão.
Ele nunca é reutilizado automaticamente.

## Cobertura do primeiro lote

| Sufixo canônico | Símbolo   | Raízes com shapes reutilizáveis | Situação                                    |
| --------------- | --------- | ------------------------------: | ------------------------------------------- |
| `7sus4`         | `7(4)`    |                           12/12 | Já existente e validado                     |
| `69`            | `6/9`     |                           12/12 | Derivado conforme tons essenciais aprovados |
| `aug`           | `+`       |                            0/12 | Aguarda shapes com fonte conhecida          |
| `9`             | `7(9)`    |                           12/12 | 8 voicings sem raiz por tom                 |
| `m9`            | `m9`      |                           12/12 | 8 voicings sem raiz por tom                 |
| `maj9`          | `7M(9)`   |                           12/12 | 10–11 voicings sem raiz por tom             |
| `madd9`         | `m(add9)` |                            0/12 | Aguarda shapes com fonte conhecida          |

Entradas sem cobertura permanecem definidas no domínio e no metadata, mas não
recebem digitações inventadas. Uma fonte verificável deve ser adicionada antes
de publicar shapes para esses acordes.

### Voicings sem raiz

Extensões de nona podem omitir raiz e quinta quando preservam seus tons
característicos e não contêm notas externas:

- `m9` exige terça menor, sétima menor e nona.
- `maj9` exige terça maior, sétima maior e nona.
- `9` exige terça maior, sétima menor e nona. Os antigos shapes sem sétima
  dominante permanecem disponíveis somente como `add9`.

O relatório marca `rootMissing` e lista os tons essenciais de cada shape. A
ordenação prefere raiz presente, depois menos omissões e por fim a ordem estável
da região do braço e da fonte. `possibleEquivalences` registra os acordes de
origem compatíveis com a mesma posição física. Esses voicings devem ser
apresentados como opções de acompanhamento.

## Expansão de cobertura rasa

O reaproveitamento determinístico também compara posições físicas já publicadas
com as notas e tons essenciais de `sus2` e `m7`. A expansão preserva a posição
original quando já pertence ao acorde e acrescenta apenas equivalências sem
notas externas.

- `sus2`: todas as raízes passam a oferecer entre 6 e 7 shapes.
- `m7`: todas as raízes passam a oferecer entre 9 e 13 shapes.
- `7`: Db, Eb, Gb, Ab e Bb passam a oferecer respectivamente 11, 9, 10, 9 e 10
  shapes publicados, dos quais 10, 8, 10, 9 e 10 são reutilizáveis.

Os dominantes acidentais são derivados por transposição cromática de um
semitom dos shapes equivalentes de C, D, F, G e A. Somente posições inteiramente
pressionadas são usadas: cordas soltas não são deslocadas, portanto a digitação
e as pestanas originais continuam válidas. Cada resultado é revalidado contra
raiz, terça maior e sétima menor, rejeita notas externas e é deduplicado pela
posição física.
