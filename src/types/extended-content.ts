export interface StepItem {
  titleKey: string;
  descriptionKey: string;
  subItemKeys?: string[];
}

export interface AnalysisGroup {
  titleKey: string;
  descriptionKeys: string[];
  icon?: string;
}

export interface ApplicationCard {
  titleKey: string;
  descriptionKey: string;
  icon?: string;
}

export interface CalloutConfig {
  titleKey: string;
  descriptionKeys: string[];
  mono?: boolean;
}

export interface StepsConfig {
  id: string;
  tocLabelKey: string;
  i18nBase: string;
  introKey?: string;
  callout?: CalloutConfig;
  items: StepItem[];
}

export interface AnalysisConfig {
  id: string;
  tocLabelKey: string;
  i18nBase: string;
  items: AnalysisGroup[];
  callout?: CalloutConfig;
}

export interface ApplicationsConfig {
  id: string;
  tocLabelKey: string;
  i18nBase: string;
  items: ApplicationCard[];
}

export interface ExtendedContentConfig {
  steps?: StepsConfig;
  analysis?: AnalysisConfig;
  applications?: ApplicationsConfig;
}
