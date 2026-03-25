# Quiz: Bioinformatics Data Formats

Test your understanding of standard bioinformatics file formats, coordinate systems, quality scores, and data conversion practices with these review questions.

---

#### 1. What information does the FASTQ format add beyond what FASTA provides?

<div class="upper-alpha" markdown>
1. Feature annotations and cross-references to other databases
2. Per-base quality scores encoded using the Phred scale
3. Three-dimensional atomic coordinates
4. Hierarchical gene model relationships using parent-child attributes
</div>

??? question "Show Answer"
    The correct answer is **B**. FASTQ extends FASTA by adding per-base quality scores, making it the standard format for raw sequencing data. Each FASTQ record contains four lines: a header, the nucleotide sequence, a separator, and a quality line with ASCII-encoded Phred scores. Feature annotations (A) are found in GenBank format. 3D coordinates (C) are in PDB format. Parent-child attributes (D) are a feature of GFF3 format.

    **Concept Tested:** FASTQ Format

---

#### 2. A Phred quality score of 30 corresponds to what probability of an incorrect base call?

<div class="upper-alpha" markdown>
1. 1 in 10 (90% accuracy)
2. 1 in 100 (99% accuracy)
3. 1 in 1,000 (99.9% accuracy)
4. 1 in 10,000 (99.99% accuracy)
</div>

??? question "Show Answer"
    The correct answer is **C**. The Phred quality score relates to error probability by $Q = -10 \cdot \log_{10}(P)$. A Phred score of 30 means $P = 10^{-3}$, or a 1 in 1,000 chance of error (99.9% accuracy). A score of 10 gives 90% accuracy (A), 20 gives 99% accuracy (B), and 40 gives 99.99% accuracy (D). Modern Illumina instruments routinely produce reads with average quality scores above 30.

    **Concept Tested:** FASTQ Format

---

#### 3. What is the critical coordinate system difference between BED and GFF3 formats?

<div class="upper-alpha" markdown>
1. BED uses 0-based half-open coordinates while GFF3 uses 1-based fully closed coordinates
2. BED uses 1-based coordinates while GFF3 uses 0-based coordinates
3. BED encodes coordinates as floating-point numbers while GFF3 uses integers
4. BED stores coordinates in columns 4-5 while GFF3 stores them in columns 1-2
</div>

??? question "Show Answer"
    The correct answer is **A**. BED uses zero-based, half-open coordinates where the start is inclusive and the end is exclusive. GFF3 uses one-based, fully closed coordinates where both start and end are inclusive. A feature from position 100 to 200 is written as `99  200` in BED but `100  200` in GFF3. This difference is one of the most common sources of off-by-one errors in bioinformatics pipelines.

    **Concept Tested:** BED Format and GFF3 Format

---

#### 4. In a VCF file, what does the genotype field `0/1` indicate?

<div class="upper-alpha" markdown>
1. The sample is homozygous for the reference allele
2. The sample has no data at this position
3. The sample is heterozygous, carrying one reference and one alternate allele
4. The sample is homozygous for the alternate allele
</div>

??? question "Show Answer"
    The correct answer is **C**. In VCF format, the genotype field uses `0` for the reference allele and `1` for the first alternate allele. The notation `0/1` indicates a heterozygous call with one reference and one alternate allele. Homozygous reference would be `0/0` (A), and homozygous alternate would be `1/1` (D). The slash indicates unphased genotypes, while a pipe `|` would indicate phased genotypes.

    **Concept Tested:** VCF Format

---

#### 5. What does the CIGAR string `50M2I48M` in a SAM alignment record represent?

<div class="upper-alpha" markdown>
1. 50 mismatches, 2 insertions, and 48 mismatches
2. 50 aligned bases, a 2-base insertion relative to the reference, then 48 more aligned bases
3. A sequence that is 50 bases long with 2 introns and 48 exonic bases
4. 50 soft-clipped bases, 2 indels, and 48 hard-clipped bases
</div>

??? question "Show Answer"
    The correct answer is **B**. In SAM format, the CIGAR string compactly encodes alignment structure. `M` indicates a match or mismatch (aligned position), `I` indicates an insertion to the reference, and `D` indicates a deletion from the reference. So `50M2I48M` means 50 aligned bases, followed by a 2-base insertion in the read relative to the reference, then 48 more aligned bases. `M` does not distinguish matches from mismatches.

    **Concept Tested:** SAM and BAM Format

---

#### 6. Which format is specifically designed for representing quantitative computational models of biological processes, including species, reactions, and mathematical rate laws?

<div class="upper-alpha" markdown>
1. BioPAX
2. OWL
3. SBML (Systems Biology Markup Language)
4. GFF3
</div>

??? question "Show Answer"
    The correct answer is **C**. SBML (Systems Biology Markup Language) is an XML-based format for representing computational models of biological processes, encoding species, reactions, compartments, and mathematical rate laws. BioPAX (A) focuses on qualitative pathway knowledge rather than quantitative models. OWL (B) is a general ontology language. GFF3 (D) describes genomic feature annotations, not pathway models.

    **Concept Tested:** SBML Format

---

#### 7. What is the primary purpose of the GenBank flat-file format compared to FASTA?

<div class="upper-alpha" markdown>
1. GenBank stores only protein sequences while FASTA stores only DNA sequences
2. GenBank provides richly annotated records including metadata, feature annotations, and literature references alongside the sequence
3. GenBank is a binary compressed format that saves storage space
4. GenBank is designed exclusively for variant data representation
</div>

??? question "Show Answer"
    The correct answer is **B**. GenBank format provides comprehensive metadata beyond the raw sequence, including organism information, literature references linked to PubMed, feature annotations (coding sequences, regulatory regions, variation sites), accession numbers with version tracking, and cross-references to other databases. FASTA stores only a header line and the sequence. Both formats can store DNA or protein sequences, making option A incorrect.

    **Concept Tested:** GenBank Format

---

#### 8. Which quality control metric, when showing a bimodal distribution in sequencing data, may suggest sample contamination?

<div class="upper-alpha" markdown>
1. Per-base quality scores
2. Read length distribution
3. GC content distribution
4. Adapter content percentage
</div>

??? question "Show Answer"
    The correct answer is **C**. The GC content distribution should match the expected GC content of the sequenced organism. A bimodal distribution suggests contamination from a second organism with different GC content. Per-base quality drops (A) indicate sequencing quality degradation. Read length variation (B) reflects trimming or platform characteristics. High adapter content (D) indicates incomplete removal of sequencing adapters.

    **Concept Tested:** Data Quality Control

---

#### 9. In the PDB file format, what information does the chain identifier encode?

<div class="upper-alpha" markdown>
1. The experimental method used to determine the structure
2. The resolution of the crystallographic data
3. Which polypeptide or nucleic acid chain each atom belongs to
4. The publication reference for the structure
</div>

??? question "Show Answer"
    The correct answer is **C**. The chain identifier in PDB format is a single letter that indicates which polypeptide or nucleic acid chain each atom belongs to. When a PDB structure contains multiple protein chains (e.g., chains A and B), these identifiers define the subunits of a complex. Co-crystal structures with multiple chains provide direct structural evidence for physical interactions between proteins, implicitly encoding graph edges in protein interaction networks.

    **Concept Tested:** PDB File Format

---

#### 10. When converting from GenBank format to FASTA format, what important consideration must be kept in mind?

<div class="upper-alpha" markdown>
1. The conversion requires changing coordinate systems from 0-based to 1-based
2. FASTA files cannot store DNA sequences longer than 10,000 bases
3. The conversion discards feature annotations, metadata, and literature references, retaining only the sequence
4. GenBank and FASTA use incompatible character encodings for nucleotides
</div>

??? question "Show Answer"
    The correct answer is **C**. Converting from GenBank to FASTA necessarily discards the rich annotations that GenBank provides, including feature annotations (coding sequences, regulatory regions), literature references, organism metadata, and database cross-references. Only the header description and the raw sequence are retained. This is a key principle of format conversion: translating from a richer format to a simpler one always involves information loss, and you must verify you do not need what is discarded.

    **Concept Tested:** Data Format Conversion
