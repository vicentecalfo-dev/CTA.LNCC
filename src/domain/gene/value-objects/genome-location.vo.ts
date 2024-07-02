import {
  Metadata,
  MetadataSource,
} from '@/shared/kernel/domain/metadata/metadata';
import { MetadataSourceAuthorship } from '@/shared/kernel/domain/metadata/metadata-source-authorship';
import { PropertyValue } from '@/shared/kernel/domain/property-value/property-value';

export class GenomeLocation {
  chromosomalLocation: PropertyValue;
  chromosome: PropertyValue;
  start: PropertyValue;
  end: PropertyValue;
  assembly: PropertyValue;
  strand: PropertyValue;

  constructor(properties: {
    chromosomalLocation: string;
    chromosome: string;
    start: string;
    end: string;
    assembly: string;
    strand: string;
  }) {
    const hgncImportMetadata = new Metadata({
      source: MetadataSource.Import,
      authorship: MetadataSourceAuthorship.available.hgnc,
    });
    const agImportMetadata = new Metadata({
      source: MetadataSource.Import,
      authorship: MetadataSourceAuthorship.available.allianceGenome,
    });

    this.chromosomalLocation = new PropertyValue({
      value: properties?.chromosomalLocation,
      metadata: hgncImportMetadata,
    });

    this.chromosome = new PropertyValue({
      value: properties?.chromosome,
      metadata: agImportMetadata,
    });

    this.start = new PropertyValue({
      value: properties?.start,
      metadata: agImportMetadata,
    });

    this.end = new PropertyValue({
      value: properties?.end,
      metadata: agImportMetadata,
    });

    this.assembly = new PropertyValue({
      value: properties?.assembly,
      metadata: agImportMetadata,
    });

    this.strand = new PropertyValue({
      value: properties?.strand,
      metadata: agImportMetadata,
    });
  }
}
