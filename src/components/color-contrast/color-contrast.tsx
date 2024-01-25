import { useRef, useState } from 'preact/hooks';
import styles from './styles.module.css';
import ColorContrastChecker from 'color-contrast-checker';
import colorContrast from 'color-contrast';
import { ArrowCounterclockwise } from '../icons/arrow-counterclockwise';

const defaultDataOnLoad = [
  { WCAG_AA: true, WCAG_AAA: true },
  { WCAG_AA: true, WCAG_AAA: true },
];
const MAX_CONTRAST_VALUE = 21;

const ColorContrast = () => {
  const [bgColor, setBgColor] = useState('#000000');
  const [fgColor, setFgColor] = useState('#FFFFFF');

  const bgColorRef: any = useRef<HTMLInputElement>(null);
  const fgColorRef: any = useRef<HTMLInputElement>(null);

  const bgPickColorRef: any = useRef<HTMLInputElement>(null);
  const fgPickColorRef: any = useRef<HTMLInputElement>(null);

  const [contrasts, setContrasts]: any = useState(defaultDataOnLoad);
  const [colorContrastValue, setColorContrastValue] =
    useState(MAX_CONTRAST_VALUE);

  const calculateContrast = (bg: any, fg: any) => {
    const ccc = new ColorContrastChecker();

    const pairs = [
      {
        colorA: bg,
        colorB: fg,
        fontSize: 14,
      },
      {
        colorA: bg,
        colorB: fg,
        fontSize: 24,
      },
    ];

    const results = ccc.checkPairs(pairs);
    const colorContrastValue = colorContrast(bg, fg);

    setColorContrastValue(parseInt(colorContrastValue));
    setContrasts(results);
    setBgColor(bg);
    setFgColor(fg);
  };

  const invertValues = () => {
    setBgColor(fgColor);
    setFgColor(bgColor);

    bgColorRef.current.value = fgColor;
    fgColorRef.current.value = bgColor;
  };

  return (
    <>
      <section className={styles.contrastRelationSection}>
        <div className={styles.contrastRelation}>
          <small>Contrast Relation</small>
          {colorContrastValue >= 4.5 ? (
            <span className={styles.passContrastRelation}>Good</span> ||
            colorContrastValue >= 7.0 ? (
              <span className={styles.passContrastRelation}>Very Good</span>
            ) : null
          ) : null}

          {colorContrastValue < 4.5 && (
            <span className={styles.failContrastRelation}>Bad</span>
          )}

          <strong className={styles.colorContrastValue}>
            <span
              className={
                colorContrastValue < 4.5
                  ? styles.failContrastRelation
                  : styles.passContrastRelation
              }
            >
              {colorContrastValue}
            </span>
          </strong>
        </div>

        <div>
          <small className={styles.bold}>Normal Text</small>
          {contrasts[0]?.WCAG_AA ? (
            <span className={styles.passResult}>
              <b>AA</b>
              <span className={styles.passBadge}>Pass</span>
            </span>
          ) : null}
          {contrasts[0]?.WCAG_AAA ? (
            <span className={styles.passResult}>
              <b>AAA</b>
              <span className={styles.passBadge}>Pass</span>
            </span>
          ) : null}

          {contrasts[0]?.WCAG_AA === false ? (
            <span className={styles.failResult}>
              <b>AA</b>
              <span className={styles.failBadge}>Fail</span>
            </span>
          ) : null}
          {contrasts[0]?.WCAG_AAA === false ? (
            <span className={styles.failResult}>
              <b>AAA</b>
              <span className={styles.failBadge}>Fail</span>
            </span>
          ) : null}
        </div>

        <div>
          <small className={styles.bold}>Large Text</small>
          {contrasts[1]?.WCAG_AA ? (
            <span className={styles.passResult}>
              <b>AA</b>
              <span className={styles.passBadge}>Pass</span>
            </span>
          ) : null}
          {contrasts[1]?.WCAG_AAA ? (
            <span className={styles.passResult}>
              <b>AAA</b>
              <span className={styles.passBadge}>Pass</span>
            </span>
          ) : null}
          {contrasts[1]?.WCAG_AA === false ? (
            <span className={styles.failResult}>
              <b>AA</b>
              <span className={styles.failBadge}>Fail</span>
            </span>
          ) : null}
          {contrasts[1]?.WCAG_AAA === false ? (
            <span className={styles.failResult}>
              <b>AAA</b>
              <span className={styles.failBadge}>Fail</span>
            </span>
          ) : null}
        </div>
      </section>

      <div className={styles.colorContrastForm}>
        <div className={styles.labelContainer}>
          <div
            className={styles.colorBlock}
            style={{
              background: `${bgColorRef.current?.value ?? '#000000'}`,
            }}
          ></div>
          <label>
            <h2>Background Color</h2>
            <input
              type="text"
              placeholder="#000000"
              defaultValue={bgColorRef.current?.value ?? '#000000'}
              ref={bgColorRef}
              onKeyUp={() =>
                calculateContrast(
                  bgColorRef.current?.value,
                  fgColorRef.current?.value
                )
              }
            />
            <input
              type="color"
              defaultValue={bgPickColorRef.current?.value ?? '#000000'}
              ref={bgPickColorRef}
              onInput={() => {
                calculateContrast(
                  bgPickColorRef.current?.value,
                  fgPickColorRef.current?.value
                );
                bgColorRef.current.value = bgPickColorRef.current?.value;
              }}
            />
          </label>
        </div>

        <button
          className={styles.invertValuesButton}
          onClick={invertValues}
          title="Invert values"
        >
          <ArrowCounterclockwise />
        </button>

        <div className={styles.labelContainer}>
          <div
            className={styles.colorBlock}
            style={{
              background: `${fgColorRef.current?.value ?? '#ffffff'}`,
            }}
          ></div>

          <label>
            <h2>Text Color</h2>
            <input
              type="text"
              placeholder="#ffffff"
              defaultValue={fgPickColorRef.current?.value ?? '#ffffff'}
              ref={fgColorRef}
              onKeyUp={() =>
                calculateContrast(
                  bgColorRef.current?.value,
                  fgColorRef.current?.value
                )
              }
            />
            <input
              type="color"
              defaultValue={fgColorRef.current?.value ?? '#ffffff'}
              ref={fgPickColorRef}
              onInput={() => {
                calculateContrast(
                  bgPickColorRef.current?.value,
                  fgPickColorRef.current?.value
                );
                fgColorRef.current.value = fgPickColorRef.current?.value;
              }}
            />
          </label>
        </div>
      </div>

      <section className={styles.demostrationContainer}>
        <div className={styles.demostrationCardTop}>
          <h3>Normal Text (16px)</h3>
          <div
            className={styles.demostrationText}
            style={{
              background: `${bgColorRef.current?.value ?? '#000000'}`,
              color: `${fgColorRef.current?.value ?? '#FFFFFF'}`,
              fontSize: '16px',
              padding: '16px',
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </div>
        </div>

        <div className={styles.demostrationCard}>
          <h3>Large Text (32px)</h3>
          <div
            className={styles.demostrationText}
            style={{
              background: `${bgColorRef.current?.value ?? '#000000'}`,
              color: `${fgColorRef.current?.value ?? '#FFFFFF'}`,
              fontSize: '32px',
              padding: '24px',
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </div>
        </div>
      </section>
    </>
  );
};

export default ColorContrast;
