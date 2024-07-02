import { Metadata } from '../metadata/metadata';

export class PropertyValue {
  value: any;
  metadata: Metadata;

  constructor(properties: { value: any; metadata: Metadata }) {
    Object.assign(this, properties);
  }
}
