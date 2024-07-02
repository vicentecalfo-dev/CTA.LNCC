import {
  Metadata,
  MetadataSource,
} from '@/shared/kernel/domain/metadata/metadata';
import { MetadataSourceAuthorship } from '@/shared/kernel/domain/metadata/metadata-source-authorship';
import { PropertyValue } from '@/shared/kernel/domain/property-value/property-value';

export class NucleotideResource {
  mane: PropertyValue[] | PropertyValue;
  maneLinks: PropertyValue[] | PropertyValue;
  ccdsId: PropertyValue[] | PropertyValue;
  ncbiCcdsLinks: PropertyValue[] | PropertyValue;
  refseq: PropertyValue[] | PropertyValue;
  refseqLinks: PropertyValue[] | PropertyValue;
  insdcId: PropertyValue[] | PropertyValue;
  insdcLinks: PropertyValue[] | PropertyValue;

  constructor(properties: {
    mane: string[];
    ccdsId: string[];
    refseq: string[];
    insdcId: string[];
  }) {
    const hgncImportMetadata = new Metadata({
      source: MetadataSource.Import,
      authorship: MetadataSourceAuthorship.available.hgnc,
    });

    this.mane =
      properties?.mane === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : properties.mane.map(
            (value) =>
              new PropertyValue({ value, metadata: hgncImportMetadata }),
          );

    this.maneLinks =
      properties?.mane === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : properties.mane.map(
            (value) =>
              new PropertyValue({
                value: this.getManeLink(value),
                metadata: hgncImportMetadata,
              }),
          );

    this.ccdsId =
      properties?.ccdsId === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : properties.ccdsId.map(
            (value) =>
              new PropertyValue({ value, metadata: hgncImportMetadata }),
          );

    this.ncbiCcdsLinks =
      properties?.ccdsId === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : properties.ccdsId.map(
            (value) =>
              new PropertyValue({
                value: `https://www.ncbi.nlm.nih.gov/projects/CCDS/CcdsBrowse.cgi?REQUEST=ALLFIELDS&DATA=${value}`,
                metadata: hgncImportMetadata,
              }),
          );

    this.refseq =
      properties?.refseq === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : properties.refseq.map(
            (value) =>
              new PropertyValue({ value, metadata: hgncImportMetadata }),
          );

    this.refseqLinks =
      properties?.refseq === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : properties.refseq.map(
            (value) =>
              new PropertyValue({
                value: {
                  nuccore: `https://www.ncbi.nlm.nih.gov/nuccore?term=${value}`,
                  seqViewer: `https://www.ncbi.nlm.nih.gov/projects/sviewer/?id=${value}`,
                },
                metadata: hgncImportMetadata,
              }),
          );

    this.insdcId =
      properties?.insdcId === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : properties.insdcId.map(
            (value) =>
              new PropertyValue({ value, metadata: hgncImportMetadata }),
          );

    this.insdcLinks =
      properties?.insdcId === null
        ? new PropertyValue({ value: null, metadata: hgncImportMetadata })
        : properties.insdcId.map(
            (value) =>
              new PropertyValue({
                value: {
                  ena: `https://www.ebi.ac.uk/ena/data/view/${value}`,
                  nuccore: `https://www.ncbi.nlm.nih.gov/nuccore/${value}`,
                  ddbj: `http://getentry.ddbj.nig.ac.jp/search/get_entry?accnumber=${value}`,
                },
                metadata: hgncImportMetadata,
              }),
          );
  }

  private getManeLink(value: string): string {
    const source = value.slice(0, 3);
    const links = {
      NM_: `https://www.ncbi.nlm.nih.gov/nuccore/${value}`,
      ENS: `https://www.ensembl.org/homo_sapiens/Transcript/Summary?db=core&t=${value}`,
    };
    return links[source];
  }
}
