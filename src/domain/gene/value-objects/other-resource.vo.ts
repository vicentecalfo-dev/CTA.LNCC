import {
  Metadata,
  MetadataSource,
} from '@/shared/kernel/domain/metadata/metadata';
import { MetadataSourceAuthorship } from '@/shared/kernel/domain/metadata/metadata-source-authorship';
import { PropertyValue } from '@/shared/kernel/domain/property-value/property-value';

export class OtherResource {
  amiGoLink: PropertyValue[] | PropertyValue;
  bioGpsLink: PropertyValue;
  monarchLink: PropertyValue;
  quickGoLink: PropertyValue[] | PropertyValue;
  geneCardsLink: PropertyValue;
  wikiGenesLink: PropertyValue;

  constructor(properties: {
    uniprotId: string[];
    entrezId: string;
    hgncId: string;
  }) {
    const hgncImportMetadata = new Metadata({
      source: MetadataSource.Import,
      authorship: MetadataSourceAuthorship.available.hgnc,
    });

    this.amiGoLink =
      properties?.uniprotId === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : properties.uniprotId.map(
          (value) =>
            new PropertyValue({
              value: `http://amigo.geneontology.org/amigo/gene_product/UniProtKB:${value}`,
              metadata: hgncImportMetadata,
            }),
        );

    this.quickGoLink =
      properties?.uniprotId === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : properties.uniprotId.map(
          (value) =>
            new PropertyValue({
              value: `https://www.ebi.ac.uk/QuickGO/GProtein?ac=${value}`,
              metadata: hgncImportMetadata,
            }),
        );

    this.bioGpsLink =
      properties?.entrezId === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : new PropertyValue({
          value: `http://biogps.org/gene/${properties.entrezId}`,
          metadata: hgncImportMetadata,
        });

    this.monarchLink =
      properties?.hgncId === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : new PropertyValue({
          value: `http://biogps.org/gene/${properties.hgncId}`,
          metadata: hgncImportMetadata,
        });

    this.geneCardsLink =
      properties?.hgncId === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : new PropertyValue({
          value: `http://www.genecards.org/cgi-bin/carddisp.pl?id_type=hgnc&id=${properties.hgncId.replace('HGNC:', '')}`,
          metadata: hgncImportMetadata,
        });

    this.wikiGenesLink =
      properties?.entrezId === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : new PropertyValue({
          value: `http://www.wikigenes.org/e/gene/e/${properties.entrezId}.html`,
          metadata: hgncImportMetadata,
        });
  }
}
