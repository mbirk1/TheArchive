import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Kategorisiere deine Karten',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        The Archive ist dazu entworfen, die eigene Sammlung einfacher zu organisieren und zu verwalten.
      </>
    ),
  },
  {
    title: 'Baue Decks und erweitere deine Sammlung',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        The Archive soll der einfache Weg sein deine Karten in Decks zu organisieren und deine Sammlung nach deinen Wünschen zu verwalten.
      </>
    ),
  },
  {
    title: 'Verfolge Ergebnisse und Statistiken',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Trage für deine Decks Ergebnisse und Statistiken ein. Womit wurde ein Gegner eliminiert worden? Poison, Commander Schaden?
      </>
    ),
  },
  {
    title: 'Powered by Angular and NestJS',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Erstellt und gewartet mit Angular und NestJS.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
