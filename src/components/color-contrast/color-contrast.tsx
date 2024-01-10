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
  const bgColorRef: any = useRef<HTMLInputElement>(null);
  const fgColorRef: any = useRef<HTMLInputElement>(null);

  const [contrasts, setContrasts]: any = useState(defaultDataOnLoad);
  const [colorContrastValue, setColorContrastValue] =
    useState(MAX_CONTRAST_VALUE);

  const calculateContrast = () => {
    const ccc = new ColorContrastChecker();

    const bg = bgColorRef.current?.value;
    const fg = fgColorRef.current?.value;

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
  };

  // Rerender function
  // This is used because the color blocks are not updated
  const [, setRerenderState] = useState(false);
  function forceRerender() {
    setRerenderState((prev) => !prev);
  }

  const invertValues = () => {
    const storedValues = [bgColorRef.current?.value, fgColorRef.current?.value];
    fgColorRef.current.value = storedValues[0];
    bgColorRef.current.value = storedValues[1];
    forceRerender();
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
            <span className={styles.pass}>AA Pass</span>
          ) : null}
          {contrasts[0]?.WCAG_AAA ? (
            <span className={styles.pass}>AAA Pass</span>
          ) : null}

          {contrasts[0]?.WCAG_AA === false ? (
            <span className={styles.fail}>AA Fail</span>
          ) : null}
          {contrasts[0]?.WCAG_AAA === false ? (
            <span className={styles.fail}>AAA Fail</span>
          ) : null}
        </div>

        <div>
          <small className={styles.bold}>Large Text</small>
          {contrasts[1]?.WCAG_AA ? (
            <span className={styles.pass}>AA Pass</span>
          ) : null}
          {contrasts[1]?.WCAG_AAA ? (
            <span className={styles.pass}>AAA Pass</span>
          ) : null}
          {contrasts[1]?.WCAG_AA === false ? (
            <span className={styles.fail}>AA Fail</span>
          ) : null}
          {contrasts[1]?.WCAG_AAA === false ? (
            <span className={styles.fail}>AAA Fail</span>
          ) : null}
        </div>
      </section>

      <div className={styles.colorContrastForm}>
        <div className={styles.labelContainer}>
          <div
            style={{
              background: `${bgColorRef.current?.value ?? '#000000'}`,
              width: 80,
              height: 80,
              border: '1px solid #DDD',
              borderRadius: '0.75rem',
            }}
          ></div>
          <label>
            <b>Background Color</b>
            <input
              type="text"
              placeholder="#000000"
              defaultValue="#000000"
              value={bgColorRef.current?.value ?? '#000000'}
              ref={bgColorRef}
              onKeyUp={() => calculateContrast()}
            />
            <input
              type="color"
              defaultValue="#000000"
              ref={bgColorRef}
              onInput={() => calculateContrast()}
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
            style={{
              background: `${fgColorRef.current?.value ?? '#ffffff'}`,
              width: 80,
              height: 80,
              border: '1px solid #DDD',
              borderRadius: '0.75rem',
            }}
          ></div>

          <label>
            <b>Text Color</b>
            <input
              type="text"
              placeholder="#ffffff"
              defaultValue="#ffffff"
              value={fgColorRef.current?.value ?? '#ffffff'}
              ref={fgColorRef}
              onKeyUp={() => calculateContrast()}
            />

            <input
              type="color"
              defaultValue="#ffffff"
              ref={fgColorRef}
              onInput={() => calculateContrast()}
            />
          </label>
        </div>
      </div>

      <section className={styles.demostrationContainer}>
        <div className={styles.demostrationCardTop}>
          <h3>Normal Text (16px)</h3>
          <div
            style={{
              background: `${bgColorRef.current?.value ?? '#000'}`,
              color: `${fgColorRef.current?.value ?? '#FFF'}`,
              padding: '15px',
              marginTop: '8px',
              borderRadius: '0.75rem',
              fontSize: '16px',
              transition: 'all .2s',
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </div>
        </div>

        <div className={styles.demostrationCard}>
          <h3>Large Text (32px)</h3>
          <div
            style={{
              background: `${bgColorRef.current?.value ?? '#000'}`,
              color: `${fgColorRef.current?.value ?? '#FFF'}`,
              padding: '25px',
              marginTop: '12px',
              borderRadius: '0.75rem',
              fontSize: '32px',
              transition: 'all .2s',
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
