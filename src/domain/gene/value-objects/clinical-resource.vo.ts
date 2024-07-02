import {
  Metadata,
  MetadataSource,
} from '@/shared/kernel/domain/metadata/metadata';
import { MetadataSourceAuthorship } from '@/shared/kernel/domain/metadata/metadata-source-authorship';
import { PropertyValue } from '@/shared/kernel/domain/property-value/property-value';

export class ClinicalResource {
  omimId: PropertyValue[] | PropertyValue;
  omimLinks: PropertyValue[] | PropertyValue;
  medlinePlusLink: PropertyValue;
  clinGenLink: PropertyValue;
  clinVarLink: PropertyValue;
  lsdbLink: PropertyValue;
  decipherLink: PropertyValue;
  ncbiGtrLink: PropertyValue;
  ncbiDbvarLink: PropertyValue;

  constructor(properties: {
    hgncId: string;
    omimId: string[];
    symbol: string;
    entrezId: string;
  }) {
    const hgncImportMetadata = new Metadata({
      source: MetadataSource.Import,
      authorship: MetadataSourceAuthorship.available.hgnc,
    });

    this.omimId =
      properties?.omimId === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : properties.omimId.map(
            (value) =>
              new PropertyValue({ value, metadata: hgncImportMetadata }),
          );

    this.omimLinks =
      properties?.omimId === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : properties.omimId.map(
            (value) =>
              new PropertyValue({
                value: `http://www.omim.org/entry/${value}`,
                metadata: hgncImportMetadata,
              }),
          );

    this.medlinePlusLink =
      properties?.symbol === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : new PropertyValue({
            value: `https://vsearch.nlm.nih.gov/vivisimo/cgi-bin/query-meta?v%3Aproject=medlineplus&query=${properties.symbol}`,
            metadata: hgncImportMetadata,
          });

    this.clinGenLink =
      properties?.hgncId === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : new PropertyValue({
            value: `https://search.clinicalgenome.org/kb/genes/${properties.hgncId}`,
            metadata: hgncImportMetadata,
          });

    this.clinVarLink =
      properties?.entrezId === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : new PropertyValue({
            value: `https://www.ncbi.nlm.nih.gov/clinvar?LinkName=gene_clinvar&from_uid=${properties.entrezId}`,
            metadata: hgncImportMetadata,
          });

    this.lsdbLink =
      properties?.symbol === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : new PropertyValue({
            value: `https://databases.lovd.nl/shared/genes/${properties.symbol}`,
            metadata: hgncImportMetadata,
          });

    this.decipherLink =
      properties?.symbol === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : new PropertyValue({
            value: `https://www.deciphergenomics.org/search?q=${properties.symbol}`,
            metadata: hgncImportMetadata,
          });

    this.ncbiGtrLink =
      properties?.entrezId === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : new PropertyValue({
            value: `https://www.ncbi.nlm.nih.gov/gtr/genes/${properties.entrezId}`,
            metadata: hgncImportMetadata,
          });

    this.ncbiDbvarLink =
      properties?.entrezId === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : new PropertyValue({
            value: `https://www.ncbi.nlm.nih.gov/dbvar?LinkName=gene_dbvar&from_uid=${properties.entrezId}`,
            metadata: hgncImportMetadata,
          });
  }
}
