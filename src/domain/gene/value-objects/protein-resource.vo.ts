import {
  Metadata,
  MetadataSource,
} from '@/shared/kernel/domain/metadata/metadata';
import { MetadataSourceAuthorship } from '@/shared/kernel/domain/metadata/metadata-source-authorship';
import { PropertyValue } from '@/shared/kernel/domain/property-value/property-value';

export class ProteinResource {
  uniprotId: PropertyValue[] | PropertyValue;
  interproLinks: PropertyValue[] | PropertyValue;
  alphafoldLinks: PropertyValue[] | PropertyValue;

  constructor(properties: { uniprotId: string[] }) {
    const hgncImportMetadata = new Metadata({
      source: MetadataSource.Import,
      authorship: MetadataSourceAuthorship.available.hgnc,
    });

    this.uniprotId =
      properties?.uniprotId === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : properties.uniprotId.map(
            (value) =>
              new PropertyValue({ value, metadata: hgncImportMetadata }),
          );

    this.interproLinks =
      properties?.uniprotId === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : properties.uniprotId.map(
            (value) =>
              new PropertyValue({
                value: {
                  interPro: `https://www.ebi.ac.uk/interpro/protein/reviewed/${value}/`,
                  pdbe: `https://www.ebi.ac.uk/pdbe/searchResults.html?display=both&term=${value}`,
                  reactome: `http://www.reactome.org/content/query?q=${value}`,
                },
                metadata: hgncImportMetadata,
              }),
          );

    this.alphafoldLinks =
      properties?.uniprotId === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : properties.uniprotId.map(
            (value) =>
              new PropertyValue({
                value: `https://alphafold.ebi.ac.uk/entry/${value}`,
                metadata: hgncImportMetadata,
              }),
          );
  }
}
