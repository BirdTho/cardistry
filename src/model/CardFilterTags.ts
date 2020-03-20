import tags from './filterTags.json';

export interface CardFilterTags {
  value: string,
  type: string,
  _value: string[],
}

export default tags as CardFilterTags[];
