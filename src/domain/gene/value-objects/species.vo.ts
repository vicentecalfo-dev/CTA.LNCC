import { Metadata, MetadataSource } from '@/shared/kernel/domain/metadata/metadata';
import { MetadataSourceAuthorship } from '@/shared/kernel/domain/metadata/metadata-source-authorship';
import { PropertyValue } from '@/shared/kernel/domain/property-value/property-value';

export class Species {
  name: PropertyValue;
  shortName: PropertyValue;
  dataProviderFullName: PropertyValue;
  dataProviderShortName: PropertyValue;
  ncbiTaxonId: PropertyValue;

  constructor(properties: {
    name: string;
    shortName: string;
    dataProviderFullName: string;
    dataProviderShortName: string;
    ncbiTaxonId: string;
  }) {
    const agImportMetadata = new Metadata({
      source: MetadataSource.Import,
      authorship: MetadataSourceAuthorship.available.allianceGenome,
    });

    this.name = new PropertyValue({
      value: properties?.name,
      metadata: agImportMetadata,
    });

    this.shortName = new PropertyValue({
      value: properties?.shortName,
      metadata: agImportMetadata,
    });

    this.dataProviderFullName = new PropertyValue({
      value: properties?.dataProviderFullName,
      metadata: agImportMetadata,
    });

    this.dataProviderShortName = new PropertyValue({
      value: properties?.dataProviderShortName,
      metadata: agImportMetadata,
    });

    this.ncbiTaxonId = new PropertyValue({
      value: properties?.ncbiTaxonId,
      metadata: agImportMetadata,
    });

  }
}
