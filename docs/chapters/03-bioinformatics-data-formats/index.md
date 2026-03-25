---
title: Bioinformatics Data Formats
description: Standard file formats for bioinformatics — FASTA, FASTQ, GenBank, GFF3, VCF, SAM/BAM, PDB, and more
generated_by: claude skill chapter-content-generator
date: 2026-03-24 22:55:15
version: 0.05
---

# Bioinformatics Data Formats

## Summary

Covers the standard file formats used throughout bioinformatics pipelines including FASTA, FASTQ, GenBank, GFF3, VCF, SAM/BAM, PDB, SBML, and BioPAX, plus data quality control and format conversion practices.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

1. FASTA Format
2. FASTQ Format
3. GenBank Format
4. GFF3 Format
5. OWL Format
6. PDB File Format
7. VCF Format
8. SAM and BAM Format
9. BED Format
10. SBML Format
11. BioPAX Format
12. CSV for Bioinformatics
13. JSON for Bioinformatics
14. Data Format Conversion
15. Data Quality Control

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Molecular Biology](../01-foundations-molecular-biology/index.md)

---

!!! mascot-welcome "Welcome, Explorers! Let's Connect the Dots!"

    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Olli welcomes you">
    In Chapter 2 we explored the databases that store biological data. Now we need to understand the languages those databases speak — the file formats that encode sequences, annotations, variants, structures, and pathways. Mastering these formats is essential because every bioinformatics pipeline begins by reading data in one format and often ends by writing results in another. Let's connect the dots between raw data and the structured files that carry it!

## Why Data Formats Matter

Bioinformatics is fundamentally a data science, and data must be structured before it can be analyzed. A DNA sequence is just a string of characters until it is wrapped in a format that records its name, its source organism, its quality scores, and its position in a genome. The file formats covered in this chapter are the shared conventions that allow sequencing instruments, alignment tools, variant callers, structure viewers, and pathway analysis programs to exchange information reliably.

Choosing the wrong format — or misunderstanding the one you have — leads to silent errors that can invalidate an entire analysis. A quality score misinterpreted by one encoding offset will produce incorrect variant calls. A GFF3 file parsed as GFF2 will scramble gene models. A VCF file missing its header lines will be rejected by every downstream tool. Understanding data formats is not glamorous work, but it is the foundation on which all reliable bioinformatics rests.

The formats in this chapter fall into several broad categories:

- **Sequence formats** — store nucleotide or amino acid sequences (FASTA, FASTQ, GenBank)
- **Annotation formats** — describe features on a reference sequence (GFF3, BED)
- **Alignment formats** — record how reads map to a reference genome (SAM, BAM)
- **Variant formats** — catalog genetic differences relative to a reference (VCF)
- **Structure formats** — represent three-dimensional atomic coordinates (PDB)
- **Pathway and ontology formats** — encode biological networks and controlled vocabularies (SBML, BioPAX, OWL)
- **General-purpose formats** — tabular and hierarchical data exchange (CSV, JSON)

| Category | Formats | Typical File Size |
|----------|---------|-------------------|
| Sequence | FASTA, FASTQ, GenBank | KB to hundreds of GB |
| Annotation | GFF3, BED | KB to hundreds of MB |
| Alignment | SAM, BAM | GB to TB |
| Variant | VCF | MB to GB |
| Structure | PDB/mmCIF | KB to tens of MB |
| Pathway/Ontology | SBML, BioPAX, OWL | KB to hundreds of MB |
| General-purpose | CSV, JSON | Variable |

## FASTA Format

The FASTA Format is the simplest and most widely used sequence format in bioinformatics. Originally developed for the FASTA sequence alignment program in 1985, it has become the universal plain-text format for nucleotide and amino acid sequences. Nearly every bioinformatics tool accepts FASTA input, and nearly every sequence database can export FASTA output.

A FASTA file consists of one or more sequence records. Each record has two parts: a header line beginning with `>` followed by a description, and one or more lines of sequence characters. There is no fixed line length, but 60 or 80 characters per line is conventional.

```
>NM_007294.4 Homo sapiens BRCA1 DNA repair associated (BRCA1), mRNA
ATGGATTTATCTGCTCTTCGCGTTGAAGAAGTACAAAATGTCATTAATGCTATGCAGAAA
ATCTTAGAGTGTCCCATCTGTCTGGAGTTGATCAAGGAACCTGTCTCCACAAAGTGTGAC
CACATATTTTGCAAATTTTGCATGCTGAAACTTCTCAACCAGAAGAAAGGGCCTTCACAG
TGTCCTTTATGTAAGAATGATATAACCAAAAGGAGCCTACAAGAAAGTACGAGATTTAGTC
>P04637 TP53_HUMAN Cellular tumor antigen p53
MEEPQSDPSVEPPLSQETFSDLWKLLPENNVLSPLPSQAMDDLMLSPDDIEQWFTEDPGP
DEAPRMPEAAPPVAPAPAAPTPAAPAPAPSWPLSSSVPSQKTYPQGLNGTVNLPGRNSFEV
RVCACPGRDRRTEEENLHETTITMTQALPDEEMSGQLQNLVKQLPADNNKTHTCPVQALKP
```

Key characteristics of the FASTA Format include:

- The `>` character must be the first character on the header line
- Everything after `>` on the header line is the sequence description (no enforced structure, though database-specific conventions exist)
- Sequence lines contain only valid characters: `A`, `C`, `G`, `T`, `N` for DNA; the 20 standard amino acid one-letter codes for protein
- Blank lines between records are permitted but not required
- The format carries no quality information — it records the sequence and nothing more

FASTA is appropriate when you need a clean, portable representation of one or more sequences. It is the input format for BLAST searches, multiple sequence alignment programs like Clustal Omega and MAFFT, and genome assembly tools. However, because FASTA lacks quality scores, it is not suitable for representing raw sequencing reads — that role belongs to FASTQ.

## FASTQ Format

The FASTQ Format extends FASTA by adding per-base quality scores, making it the standard format for raw sequencing data from Illumina, PacBio, Oxford Nanopore, and other platforms. Every sequencing run produces FASTQ files, and they are typically the first files you encounter in any genomics pipeline.

A FASTQ record contains exactly four lines:

```
@SRR123456.1 HWI-ST1234:100:C1234ACXX:1:1101:1234:2045 length=150
ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG
+
IIIIIIIIIIIIIIIIIHHHHHGGGGFFFDDDCCCCBBBBBAAA@@@@?????
```

The four lines encode:

1. **Header line** — begins with `@`, contains a sequence identifier and optional description
2. **Sequence line** — the nucleotide sequence (same characters as FASTA)
3. **Separator line** — a `+` character, optionally followed by a repeat of the identifier
4. **Quality line** — ASCII-encoded quality scores, one character per base, same length as the sequence line

The quality scores use the Phred scale, where the quality value $Q$ relates to the probability of an incorrect base call $P$ by:

$$Q = -10 \cdot \log_{10}(P)$$

A Phred score of 20 means a 1 in 100 chance of error (99% accuracy), while a score of 30 means a 1 in 1,000 chance (99.9% accuracy). Modern Illumina instruments routinely produce reads with average quality scores above 30.

| Phred Score | Error Probability | Accuracy | ASCII (Phred+33) |
|-------------|-------------------|----------|-------------------|
| 10 | 1 in 10 | 90% | `+` |
| 20 | 1 in 100 | 99% | `5` |
| 30 | 1 in 1,000 | 99.9% | `?` |
| 40 | 1 in 10,000 | 99.99% | `I` |

The ASCII encoding adds an offset to the Phred score to produce a printable character. The current standard (Sanger/Illumina 1.8+) uses an offset of 33, so a Phred score of 30 is encoded as ASCII character 63, which is `?`. Older Illumina pipelines (versions 1.3 through 1.7) used an offset of 64 — a source of many historic bugs in bioinformatics pipelines.

!!! mascot-thinking "What's the Link?"

    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Olli thinking">
    Notice how FASTQ builds on FASTA by adding exactly one new dimension — quality. This layered design is a pattern you will see throughout bioinformatics formats. Simple formats capture the essentials, and more complex formats extend them with additional metadata. When you encounter a new format, ask yourself: what information does this format add beyond what simpler formats already capture?

## GenBank Format

The GenBank Format is the richly annotated flat-file format used by NCBI's GenBank database. While FASTA stores only the sequence and FASTQ adds quality scores, GenBank records contain comprehensive metadata including the organism, references to published literature, feature annotations (coding sequences, regulatory regions, variation sites), and cross-references to other databases.

A simplified GenBank record looks like this:

```
LOCUS       NM_007294               7088 bp    mRNA    linear   PRI 15-JAN-2026
DEFINITION  Homo sapiens BRCA1 DNA repair associated (BRCA1), mRNA.
ACCESSION   NM_007294
VERSION     NM_007294.4
KEYWORDS    RefSeq.
SOURCE      Homo sapiens (human)
  ORGANISM  Homo sapiens
            Eukaryota; Metazoa; Chordata; Mammalia; Primates; Hominidae; Homo.
REFERENCE   1
  AUTHORS   Miki,Y., Swensen,J., Shattuck-Eidens,D., ...
  TITLE     A strong candidate for the breast and ovarian cancer ...
  JOURNAL   Science 266 (5182), 66-71 (1994)
   PUBMED   7545954
FEATURES             Location/Qualifiers
     source          1..7088
                     /organism="Homo sapiens"
                     /mol_type="mRNA"
     gene            1..7088
                     /gene="BRCA1"
     CDS             120..5711
                     /gene="BRCA1"
                     /protein_id="NP_009225.1"
                     /translation="MDLSALREER..."
ORIGIN
        1 atggatttat ctgctcttcg cgttgaagaa gtacaaaatg tcattaatgc tatgcagaaa
       61 atcttagagt gtcccatctg tctggagttg atcaaggaac ctgtctccac aaagtgtgac
//
```

The major sections of a GenBank record are:

- **LOCUS** — sequence name, length, molecule type, topology, division, and date
- **DEFINITION** — a brief description of the sequence
- **ACCESSION / VERSION** — the stable identifier and its version number
- **FEATURES** — the annotation table, where each feature has a type (gene, CDS, mRNA, etc.), a location on the sequence, and qualifier key-value pairs
- **ORIGIN** — the nucleotide sequence itself, numbered by position
- **//** — the record terminator

GenBank format is essential for understanding annotated reference sequences. When you download a gene from NCBI, the GenBank record tells you not just the sequence but where the coding sequence starts and ends, what protein it encodes, and which papers first described it.

## GFF3 Format

The GFF3 Format (Generic Feature Format version 3) is a tab-delimited text format for describing features on a reference sequence — genes, exons, regulatory elements, binding sites, and any other genomic annotation. GFF3 is the standard output of genome annotation pipelines and the input to genome browsers and downstream analysis tools.

Each line in a GFF3 file contains nine tab-separated columns:

```
##gff-version 3
chr1	HAVANA	gene	11869	14409	.	+	.	ID=ENSG00000223972;Name=DDX11L1;biotype=transcribed_unprocessed_pseudogene
chr1	HAVANA	mRNA	11869	14409	.	+	.	ID=ENST00000456328;Parent=ENSG00000223972;Name=DDX11L1-201
chr1	HAVANA	exon	11869	12227	.	+	.	ID=exon1;Parent=ENST00000456328
chr1	HAVANA	exon	12613	12721	.	+	.	ID=exon2;Parent=ENST00000456328
chr1	HAVANA	exon	13221	14409	.	+	.	ID=exon3;Parent=ENST00000456328
```

| Column | Name | Description |
|--------|------|-------------|
| 1 | seqid | Chromosome or scaffold name |
| 2 | source | Program or database that generated the feature |
| 3 | type | Feature type (gene, mRNA, exon, CDS, etc.) |
| 4 | start | Start position (1-based, inclusive) |
| 5 | end | End position (1-based, inclusive) |
| 6 | score | Numerical score (or `.` if not applicable) |
| 7 | strand | `+` (forward), `-` (reverse), or `.` (unstranded) |
| 8 | phase | For CDS features: 0, 1, or 2 (reading frame offset) |
| 9 | attributes | Semicolon-separated key=value pairs (ID, Name, Parent, etc.) |

The critical innovation of GFF3 over earlier formats is the Parent attribute, which creates hierarchical relationships: a gene contains mRNAs, each mRNA contains exons and CDS features. This parent-child structure forms a directed acyclic graph that mirrors the biological reality of gene structure.

## BED Format

The BED Format (Browser Extensible Data) is a simpler, more compact alternative to GFF3 for representing genomic intervals. Originally designed for the UCSC Genome Browser, BED has become a widely used format for any analysis that works with genomic regions — peak calling in ChIP-seq, defining target regions for exome capture, and specifying intervals for coverage analysis.

A BED file is tab-delimited with a minimum of three columns and up to twelve optional columns:

```
chr7	127471196	127472363	Pos1	0	+	127471196	127472363	255,0,0
chr7	127472363	127473530	Pos2	0	+	127472363	127473530	255,0,0
chr7	127473530	127474697	Pos3	0	+	127473530	127474697	255,0,0
```

The first three columns are required:

- **chrom** — chromosome name
- **chromStart** — start position (0-based)
- **chromEnd** — end position (exclusive)

A crucial difference between BED and GFF3 is coordinate convention. BED uses zero-based, half-open coordinates (the start is inclusive and the end is exclusive), while GFF3 uses one-based, fully closed coordinates (both start and end are inclusive). A feature from position 100 to 200 is written as `100  200` in BED but `101  200` in GFF3. This difference is one of the most common sources of off-by-one errors in bioinformatics, and tools like bedtools and UCSC liftOver are designed with BED conventions in mind.

!!! mascot-warning "Watch Out!"

    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Olli warns you">
    The difference between zero-based half-open (BED) and one-based fully closed (GFF3) coordinates causes more subtle bugs than almost any other issue in genomics. When converting between formats, always adjust coordinates explicitly. A feature at BED coordinates `chr1  99  200` corresponds to GFF3 coordinates `chr1  100  200`. Off-by-one errors here can shift every variant call, every exon boundary, and every peak summit in your analysis.

## VCF Format

The VCF Format (Variant Call Format) is the standard for representing genetic variants — single nucleotide polymorphisms (SNPs), insertions, deletions, and structural variants — relative to a reference genome. VCF is the output of variant calling pipelines like GATK, DeepVariant, and bcftools, and the input to variant annotation, filtering, and association analysis tools.

A VCF file has three sections: meta-information lines (beginning with `##`), a header line (beginning with `#`), and data lines:

```
##fileformat=VCFv4.3
##INFO=<ID=DP,Number=1,Type=Integer,Description="Total Depth">
##FORMAT=<ID=GT,Number=1,Type=String,Description="Genotype">
##FORMAT=<ID=GQ,Number=1,Type=Integer,Description="Genotype Quality">
#CHROM	POS	ID	REF	ALT	QUAL	FILTER	INFO	FORMAT	Sample1
chr17	43094464	rs80357713	G	A	99	PASS	DP=45	GT:GQ	0/1:99
chr17	43091434	rs1799950	G	A	85	PASS	DP=38	GT:GQ	1/1:85
```

The eight fixed columns are:

| Column | Description |
|--------|-------------|
| CHROM | Chromosome |
| POS | 1-based position of the variant |
| ID | Variant identifier (e.g., rsID from dbSNP) |
| REF | Reference allele |
| ALT | Alternate allele(s), comma-separated if multiallelic |
| QUAL | Phred-scaled quality score for the variant call |
| FILTER | `PASS` or a list of filters that the variant failed |
| INFO | Semicolon-separated key=value annotations |

After the fixed columns, VCF files for multi-sample studies include a FORMAT column defining per-sample fields, followed by one column per sample. The genotype field `GT` uses `0` for the reference allele and `1`, `2`, etc. for alternate alleles, separated by `/` (unphased) or `|` (phased). Thus `0/1` indicates a heterozygous call, `1/1` a homozygous alternate, and `0/0` a homozygous reference.

## SAM and BAM Format

The SAM and BAM Format pair represents sequence alignments — the result of mapping sequencing reads to a reference genome. SAM (Sequence Alignment/Map) is the human-readable text format, while BAM is its binary, compressed equivalent. In practice, most pipelines produce BAM files because they are 3-5 times smaller than SAM and support random access through index files (BAI).

A SAM file begins with an optional header section (lines starting with `@`) followed by alignment records, one per line with eleven mandatory tab-separated fields:

```
@HD	VN:1.6	SO:coordinate
@SQ	SN:chr17	LN:83257441
@RG	ID:sample1	SM:Sample1	PL:ILLUMINA
read001	99	chr17	43094464	60	150M	=	43094614	300	ATCGATCG...	IIIIIIII...	NM:i:1	MD:Z:75G74
read002	147	chr17	43094614	60	150M	=	43094464	-300	GCTAGCTA...	HHHHHHHH...	NM:i:0	MD:Z:150
```

Key SAM fields include:

| Field | Name | Description |
|-------|------|-------------|
| 1 | QNAME | Read name |
| 2 | FLAG | Bitwise flag encoding read properties (paired, mapped, strand, etc.) |
| 3 | RNAME | Reference sequence name (chromosome) |
| 4 | POS | 1-based leftmost mapping position |
| 5 | MAPQ | Mapping quality (Phred-scaled) |
| 6 | CIGAR | Compact representation of the alignment (e.g., `150M` = 150 matches) |
| 10 | SEQ | Read sequence |
| 11 | QUAL | Base quality string (same encoding as FASTQ) |

The FLAG field is a bitwise integer where each bit indicates a property of the read. For example, flag 99 = 64 + 32 + 2 + 1, meaning the read is paired (1), properly paired (2), the mate is reverse strand (32), and this is the first read in the pair (64). Decoding flags is essential for filtering alignments — tools like `samtools view -f` and `samtools view -F` use flag values to include or exclude reads.

The CIGAR string encodes the alignment structure compactly. Common operations include `M` (match or mismatch), `I` (insertion to the reference), `D` (deletion from the reference), `S` (soft clipping), and `N` (skipped region, used for spliced alignments in RNA-seq). A CIGAR of `50M2I48M` means 50 aligned bases, a 2-base insertion, then 48 more aligned bases.

## PDB File Format

The PDB File Format stores three-dimensional atomic coordinates of biological macromolecules — proteins, nucleic acids, and their complexes with small-molecule ligands. Originally developed for the Protein Data Bank in the 1970s, the fixed-column-width PDB format has been largely superseded by the more flexible mmCIF (macromolecular Crystallographic Information File) format for new depositions. However, PDB format files remain widely used and understood.

A PDB file contains several record types, but the most important for structural analysis are ATOM and HETATM records:

```
HEADER    DNA BINDING PROTEIN                     23-JAN-07   2P53
ATOM      1  N   MET A   1      27.340  24.430   2.614  1.00  9.67           N
ATOM      2  CA  MET A   1      26.266  25.413   2.842  1.00 10.38           C
ATOM      3  C   MET A   1      26.913  26.639   3.531  1.00  9.62           C
ATOM      4  O   MET A   1      27.886  26.463   4.263  1.00  9.62           O
HETATM 2001  ZN  ZN  A 301      19.452  28.153  15.230  1.00 14.52          ZN
```

Each ATOM record specifies:

- **Atom serial number** — sequential counter
- **Atom name** — e.g., CA for alpha carbon, N for backbone nitrogen
- **Residue name** — three-letter amino acid code (MET, ALA, etc.) or nucleotide code
- **Chain identifier** — letter designating the polypeptide or nucleic acid chain
- **Residue sequence number** — position in the chain
- **X, Y, Z coordinates** — in Angstroms
- **Occupancy and B-factor** — measures of atomic position certainty

The PDB format uses fixed column positions — the X coordinate always occupies columns 31-38, for example. This rigid structure makes parsing straightforward but limits extensibility, which is why the community has moved toward mmCIF for new depositions. Structural analysis tools like PyMOL, ChimeraX, and Biopython's PDB parser can read both formats.

!!! mascot-thinking "Let's Connect the Dots!"

    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Olli thinking">
    Notice the chain identifier in PDB files — a single letter that tells you which polypeptide chain each atom belongs to. When a PDB structure contains multiple protein chains, these chain identifiers define the subunits of a complex. In protein interaction network analysis, a co-crystal structure with chains A and B provides direct structural evidence for a physical interaction between those two proteins. The PDB format thus encodes graph edges (interactions) implicitly through chain co-occurrence in a single structure file.

## Pathway and Ontology Formats

Biological knowledge extends beyond sequences and structures to encompass metabolic pathways, signaling networks, and controlled vocabularies. Three XML-based formats dominate this space: SBML, BioPAX, and OWL.

### SBML Format

The SBML Format (Systems Biology Markup Language) is an XML-based format for representing computational models of biological processes, particularly metabolic and signaling networks. SBML encodes species (molecules), reactions (transformations), compartments (cellular locations), and mathematical rate laws that govern reaction kinetics.

```xml
<model id="glycolysis">
  <listOfCompartments>
    <compartment id="cytoplasm" size="1"/>
  </listOfCompartments>
  <listOfSpecies>
    <species id="glucose" compartment="cytoplasm" initialConcentration="5.0"/>
    <species id="G6P" compartment="cytoplasm" initialConcentration="0.0"/>
  </listOfSpecies>
  <listOfReactions>
    <reaction id="hexokinase" reversible="false">
      <listOfReactants>
        <speciesReference species="glucose"/>
      </listOfReactants>
      <listOfProducts>
        <speciesReference species="G6P"/>
      </listOfProducts>
    </reaction>
  </listOfReactions>
</model>
```

SBML is the standard exchange format for systems biology models. Repositories like BioModels and the BioCyc database distribute models in SBML format, and simulation tools like COPASI and CellDesigner read and write SBML natively. From a graph perspective, an SBML model defines a bipartite graph: species nodes are connected to reaction nodes by reactant and product edges.

### BioPAX Format

The BioPAX Format (Biological Pathway Exchange) is an OWL-based ontology and data format designed specifically for exchanging biological pathway data between databases. While SBML focuses on quantitative simulation, BioPAX focuses on qualitative representation of pathway knowledge — which molecules participate in which reactions, what controls those reactions, and how pathways connect.

BioPAX defines a class hierarchy of biological entities (Protein, SmallMolecule, Complex, Gene) and interactions (BiochemicalReaction, Catalysis, Control, Transport). Pathway databases like Reactome, KEGG, and BioCyc export their data in BioPAX format, making it possible to integrate pathway knowledge from multiple sources into a single network.

BioPAX uses three levels of increasing complexity:

- **Level 1** — metabolic pathways only
- **Level 2** — adds molecular interactions and gene regulation
- **Level 3** — adds genetic interactions, molecular location, and generics

### OWL Format

The OWL Format (Web Ontology Language) is not specific to bioinformatics but is the foundation for many biological ontologies. OWL is a W3C standard for defining ontologies — formal descriptions of concepts, their properties, and the relationships between them. The Gene Ontology, Disease Ontology, Human Phenotype Ontology, and BioPAX itself are all expressed in OWL.

An OWL ontology defines classes (concepts), properties (relationships between concepts), and individuals (instances of classes). OWL supports logical axioms such as class subsumption (is-a relationships), property restrictions (all values must come from a given class), and equivalence (two classes have exactly the same members). These axioms enable automated reasoning — an OWL reasoner can infer new relationships that are logically implied but not explicitly stated.

In bioinformatics, OWL is important because it provides the formal underpinning for knowledge graphs. When you represent gene functions using GO terms, diseases using DO terms, and phenotypes using HPO terms, you are working with OWL ontologies that define how those terms relate to each other in a directed acyclic graph.

## General-Purpose Formats: CSV and JSON

Not all bioinformatics data fits neatly into domain-specific formats. Many analysis results, metadata tables, and intermediate files use general-purpose formats.

### CSV for Bioinformatics

CSV for Bioinformatics (Comma-Separated Values, or its tab-separated variant TSV) is the workhorse format for tabular data. Gene expression matrices, differential expression results, annotation tables, sample metadata, and many database downloads arrive as CSV or TSV files.

```
gene_id,gene_name,log2fc,pvalue,padj
ENSG00000141510,TP53,2.34,1.2e-15,3.6e-12
ENSG00000012048,BRCA1,-1.87,4.5e-10,8.1e-07
ENSG00000139618,BRCA2,-0.95,2.3e-06,1.8e-03
```

Best practices for CSV in bioinformatics include:

- Use TSV (tab-delimited) rather than CSV when field values may contain commas (e.g., gene descriptions)
- Always include a header row with column names
- Use consistent missing value codes (`NA`, not empty cells or mixed representations)
- Quote fields that contain delimiter characters
- Store genomic coordinates with explicit column names indicating the coordinate system (0-based or 1-based)

### JSON for Bioinformatics

JSON for Bioinformatics (JavaScript Object Notation) has become increasingly important as biological databases shift from flat files to web APIs. REST API responses from NCBI, UniProt, Ensembl, and other databases are typically returned in JSON format. JSON's hierarchical structure makes it well-suited for representing nested biological data — a gene with multiple transcripts, each containing multiple exons, maps naturally to nested JSON objects.

```json
{
  "gene_id": "ENSG00000141510",
  "symbol": "TP53",
  "biotype": "protein_coding",
  "transcripts": [
    {
      "transcript_id": "ENST00000269305",
      "is_canonical": true,
      "exons": [
        {"start": 7571720, "end": 7571865},
        {"start": 7573927, "end": 7574033}
      ]
    }
  ]
}
```

JSON is human-readable, well-supported by every programming language, and handles heterogeneous data structures that would be awkward in tabular formats. However, JSON files are larger than equivalent binary formats, and parsing large JSON files (tens of gigabytes) can be memory-intensive. For very large datasets, line-delimited JSON (JSONL), where each line is an independent JSON object, offers a good compromise between structure and scalability.

## Data Format Conversion

Real bioinformatics pipelines rarely use a single format from start to finish. Data Format Conversion — translating data from one format to another — is one of the most common tasks in day-to-day bioinformatics work. Every conversion requires understanding the source format, the target format, and what information may be lost or gained in translation.

Common conversion scenarios include:

| From | To | Tool(s) | Notes |
|------|-----|---------|-------|
| FASTQ | FASTA | seqtk, awk | Discards quality scores |
| SAM | BAM | samtools view | Lossless binary compression |
| BAM | FASTQ | samtools fastq, bedtools | Extracts reads from alignments |
| GFF3 | BED | gff2bed (BEDOPS) | Adjusts coordinate system (1-based to 0-based) |
| BED | GFF3 | bed2gff | Adjusts coordinate system (0-based to 1-based) |
| GenBank | FASTA | BioPython, seqret (EMBOSS) | Extracts sequence only |
| GenBank | GFF3 | bp_genbank2gff3 (BioPerl) | Extracts feature annotations |
| VCF | TSV | bcftools query | Custom column extraction |
| PDB | mmCIF | gemmi, BioPython | Modern structure format |
| SBML | BioPAX | Specialized converters | May lose quantitative details |

!!! mascot-tip "Pro Tip from Olli"

    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Olli has a tip">
    Before writing your own format conversion script, check whether a well-tested tool already exists. samtools, bedtools, bcftools, seqtk, and BioPython handle the vast majority of common conversions. These tools have been used by thousands of researchers and handle edge cases (malformed records, missing fields, encoding differences) that a quick custom script will miss. Only write custom parsers when you have a genuinely unusual format.

Key principles for reliable format conversion:

1. **Validate before converting** — check that the input file conforms to its format specification before feeding it to a converter
2. **Understand coordinate systems** — always verify whether positions are 0-based or 1-based, and whether intervals are half-open or closed
3. **Check for information loss** — converting from a richer format to a simpler one (e.g., GenBank to FASTA) necessarily discards information; make sure you do not need what is lost
4. **Preserve metadata** — when possible, carry forward sample names, quality metrics, and provenance information through each conversion step
5. **Verify round-trip fidelity** — if you convert from A to B and back to A, the result should match the original (when the formats have comparable expressiveness)

## Data Quality Control

Data Quality Control encompasses the practices and tools used to assess, filter, and improve the quality of bioinformatics data before analysis. Quality control is not a single step but a continuous process applied at every stage of a pipeline — from raw sequencing reads through final variant calls or expression estimates.

### Quality Control for Sequencing Data

The most common quality control step in bioinformatics is assessing raw FASTQ files with tools like FastQC and MultiQC. FastQC produces a series of diagnostic plots for each FASTQ file.

Key quality metrics for sequencing data include:

- **Per-base quality scores** — quality should remain high (above Phred 20-30) across the read length; a drop at the 3' end is common and may require trimming
- **Per-sequence quality distribution** — the majority of reads should have high average quality
- **Sequence content** — base composition should be roughly uniform (for whole-genome data) or match expected patterns (for targeted sequencing)
- **GC content** — the distribution should match the expected GC content of the organism; bimodal distributions suggest contamination
- **Adapter content** — sequencing adapters should be removed by trimming tools (Trimmomatic, fastp, cutadapt) before alignment
- **Duplication levels** — high duplication rates may indicate PCR amplification bias or low library complexity

#### Diagram: FASTQ Quality Control Pipeline

<iframe src="../../sims/fastq-qc-pipeline/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Diagram Specification</summary>

- **Sim ID**: fastq-qc-pipeline
- **Library**: vis-network
- **Status**: Specified

This interactive flowchart diagram shows the steps in a FASTQ quality control pipeline as a directed graph. Nodes represent processing steps (Raw FASTQ, FastQC Assessment, Adapter Trimming, Quality Trimming, Length Filtering, Clean FASTQ, MultiQC Report). Edges are directed arrows showing the data flow. Decision nodes indicate pass/fail quality checks. Color coding: input/output nodes in blue, QC assessment nodes in green, trimming/filtering nodes in orange, decision nodes in yellow. Layout is top-to-bottom to show pipeline flow.

Note: Apply slight y-offset (from 480 to 490) for any horizontal edges to avoid the vis-network label rendering bug.
</details>

### Quality Control for Alignments and Variants

Quality control extends beyond raw reads to every downstream data product:

- **Alignment QC** — samtools flagstat and Picard CollectAlignmentSummaryMetrics report mapping rates, duplicate rates, and insert size distributions for BAM files
- **Variant QC** — bcftools stats reports variant counts by type (SNP, indel), transition/transversion ratios ($Ti/Tv$ ratio should be approximately 2.0-2.1 for whole-genome SNPs in humans), and heterozygosity rates
- **Annotation QC** — checking that GFF3 files have valid parent-child relationships, that all feature types are from controlled vocabularies, and that coordinates fall within chromosome boundaries

A robust quality control strategy follows a consistent pattern:

1. **Assess** — run diagnostic tools and generate quality reports
2. **Evaluate** — compare metrics against known thresholds and expectations
3. **Filter or correct** — trim low-quality bases, remove adapter sequences, mark duplicates, or exclude failed samples
4. **Re-assess** — verify that filtering improved data quality without excessive data loss
5. **Document** — record all QC parameters, thresholds, and tool versions for reproducibility

| Pipeline Stage | QC Tools | Key Metrics |
|----------------|----------|-------------|
| Raw reads (FASTQ) | FastQC, MultiQC | Per-base quality, adapter content, GC distribution |
| Alignment (BAM) | samtools flagstat, Picard | Mapping rate, duplicate rate, insert size |
| Variants (VCF) | bcftools stats, VariantQC | Ti/Tv ratio, het/hom ratio, call rate |
| Annotations (GFF3) | GenomeTools gff3validator | Parent-child integrity, valid feature types |

!!! mascot-celebration "Great Work, Investigators!"

    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Olli celebrates">
    You now speak the languages of bioinformatics data! From the simplicity of FASTA to the complexity of SBML and BioPAX, you understand the formats that carry sequences, qualities, annotations, variants, structures, and pathways through analysis pipelines. More importantly, you know that converting between these formats, validating their contents, and controlling data quality are skills just as critical as running the analysis itself. In the chapters ahead, we will put these formats to work — reading them, writing them, and building graphs from the relationships they encode. Onward!

## Key Takeaways

1. **FASTA** is the simplest sequence format, storing only a header and a sequence. It is universally accepted but carries no quality information.

2. **FASTQ** extends FASTA with per-base Phred quality scores, making it the standard format for raw sequencing reads. The quality encoding ($Q = -10 \cdot \log_{10}(P)$) quantifies base-call confidence.

3. **GenBank** format provides richly annotated sequence records including organism metadata, literature references, feature annotations, and cross-references to other databases.

4. **GFF3** is the standard tab-delimited format for genomic annotations, using 1-based fully closed coordinates and Parent attributes to define hierarchical gene models.

5. **BED** format uses 0-based half-open coordinates for genomic intervals — the coordinate difference from GFF3 is a persistent source of off-by-one errors.

6. **VCF** is the standard format for genetic variant representation, encoding SNPs, insertions, deletions, and structural variants relative to a reference genome with per-sample genotype information.

7. **SAM/BAM** files store sequence alignments, with BAM providing compressed binary storage and random access. The FLAG field and CIGAR string are essential for interpreting alignment records.

8. **PDB** format stores three-dimensional atomic coordinates of biological macromolecules using fixed-column-width records, with chain identifiers that implicitly encode protein complex composition.

9. **SBML** encodes quantitative systems biology models (species, reactions, kinetics), while **BioPAX** encodes qualitative pathway knowledge (interactions, regulations, pathway membership).

10. **OWL** provides the formal ontology framework underlying Gene Ontology, Disease Ontology, and other controlled vocabularies that structure biological knowledge as directed acyclic graphs.

11. **CSV/TSV** and **JSON** serve as general-purpose formats for tabular data and hierarchical API responses, respectively, complementing the domain-specific formats.

12. **Data format conversion** requires understanding coordinate systems, information content differences, and the availability of validated tools like samtools, bedtools, bcftools, and BioPython.

13. **Data quality control** is a continuous process applied at every pipeline stage — from raw read assessment (FastQC) through alignment QC (samtools flagstat) to variant QC (bcftools stats) — and must be documented for reproducibility.
