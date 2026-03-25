# Quiz: Genome Assembly and Variation Graphs

Test your understanding of de Bruijn graphs, k-mer analysis, pangenome graphs, variation graphs, sequencing technologies, and variant calling methods.

---

#### 1. In a de Bruijn graph for genome assembly, what do nodes and edges represent?

<div class="upper-alpha" markdown>
1. Nodes represent entire reads and edges represent sequence overlaps between reads
2. Nodes represent (k-1)-mers and edges represent k-mers, where consecutive k-mers share a (k-1)-mer overlap
3. Nodes represent chromosomes and edges represent inter-chromosomal translocations
4. Nodes represent genes and edges represent regulatory relationships
</div>

??? question "Show Answer"
    The correct answer is **B**. In a de Bruijn graph, nodes represent (k-1)-mers and directed edges represent k-mers. An edge connects node $u$ to node $v$ if the last (k-1) characters of the k-mer starting at $u$ match the (k-1)-mer at $v$. This means consecutive k-mers share a (k-1)-mer overlap. This elegant representation avoids the expensive all-versus-all read comparison required by overlap-based assemblers, making de Bruijn graphs the foundation of modern short-read assembly.

    **Concept Tested:** De Bruijn Graph

---

#### 2. What information does the k-mer spectrum reveal before assembly begins?

<div class="upper-alpha" markdown>
1. The exact locations of all genes in the genome
2. The phylogenetic relationships among sequenced organisms
3. Estimates of genome size, heterozygosity, repetitive content, and sequencing error rates
4. The three-dimensional structure of the assembled chromosomes
</div>

??? question "Show Answer"
    The correct answer is **C**. The k-mer spectrum is a histogram of k-mer frequencies that reveals key properties of the sequenced genome. The main peak position estimates sequencing depth, the total k-mer count divided by peak frequency estimates genome size, secondary peaks indicate heterozygosity or copy number variation, and the spike of low-frequency k-mers reflects sequencing errors. Tools like GenomeScope automate this analysis as a quality control step before assembly.

    **Concept Tested:** K-mer Spectrum

---

#### 3. What is reference bias, and how do pangenome graphs address it?

<div class="upper-alpha" markdown>
1. Reference bias is the tendency for databases to contain more sequences from model organisms; pangenome graphs include sequences from all organisms
2. Reference bias occurs when reads carrying variants different from the linear reference genome are harder to map correctly; pangenome graphs represent multiple haplotypes as graph paths, reducing this bias
3. Reference bias means older genome assemblies are always preferred; pangenome graphs replace all old assemblies
4. Reference bias is a statistical artifact that only affects bacterial genomes
</div>

??? question "Show Answer"
    The correct answer is **B**. When reads are mapped to a single linear reference genome, reads carrying variants (especially structural variants and indels) may fail to align correctly or may be penalized, leading to systematic underrepresentation of non-reference alleles. Pangenome graphs encode multiple haplotypes and known variants as alternate paths through the graph, so reads carrying any represented variant can map correctly. The vg toolkit implements this graph-based mapping approach.

    **Concept Tested:** Reference Bias and Pangenome Graph

---

#### 4. What is the N50 metric and why is it used to evaluate genome assemblies?

<div class="upper-alpha" markdown>
1. N50 is the total number of contigs in an assembly; lower values indicate better assemblies
2. N50 is the percentage of the genome covered by at least 50 reads
3. N50 is the contig length such that contigs of this length or longer comprise at least 50% of the total assembly length; larger N50 indicates more contiguous assemblies
4. N50 is the number of gaps remaining in a scaffolded assembly
</div>

??? question "Show Answer"
    The correct answer is **C**. N50 is the most widely used assembly quality metric. To calculate it, sort all contigs by length from longest to shortest, then sum lengths until the running total reaches 50% of the total assembly size. The length of the contig that crosses that 50% threshold is the N50. Larger N50 values indicate a more contiguous assembly with fewer, longer sequences. However, N50 alone does not assess correctness — complementary metrics like BUSCO completeness are also needed.

    **Concept Tested:** N50 Metric and Assembly Quality Metrics

---

#### 5. How do long reads from PacBio and Oxford Nanopore improve genome assembly compared to short reads?

<div class="upper-alpha" markdown>
1. Long reads have lower per-base error rates than short reads
2. Long reads are cheaper to produce than short reads
3. Long reads can span most repetitive elements, simplifying the assembly graph and producing more contiguous assemblies
4. Long reads eliminate the need for quality control steps
</div>

??? question "Show Answer"
    The correct answer is **C**. Long reads ranging from thousands to hundreds of thousands of base pairs can span most repetitive elements in genomes, dramatically simplifying the de Bruijn graph topology that causes fragmentation with short reads. This produces more contiguous assemblies with fewer, longer contigs. Long reads typically have higher per-base error rates than Illumina short reads (A is incorrect), which is why many projects use hybrid strategies combining long reads for continuity and short reads for base-level polishing.

    **Concept Tested:** Long Reads and Short Reads

---

#### 6. What is a variation graph and how does it differ from a linear reference genome?

<div class="upper-alpha" markdown>
1. A variation graph is a visualization tool for displaying mutations on a chromosome diagram
2. A variation graph encodes a reference sequence plus known variants as alternate paths through a directed graph, representing population-level diversity in a single structure
3. A variation graph lists all variants in a VCF file sorted by chromosomal position
4. A variation graph is identical to a de Bruijn graph but uses longer k-mers
</div>

??? question "Show Answer"
    The correct answer is **B**. A variation graph is a directed graph where the reference sequence forms the backbone path and known variants (SNPs, indels, structural variants) create alternate paths that branch off and rejoin the backbone. Each individual's genome corresponds to a walk through the graph. This structure captures population-level diversity in a single data structure, enabling unbiased read mapping and variant calling without the reference bias inherent in linear reference approaches.

    **Concept Tested:** Variation Graph

---

#### 7. What is the relationship between sequencing depth and the probability that a genomic position is covered?

<div class="upper-alpha" markdown>
1. The relationship is linear: doubling depth doubles coverage
2. According to the Lander-Waterman model, the probability of a base being uncovered decreases exponentially as $P = e^{-c}$, where $c$ is the average depth
3. Sequencing depth and coverage are unrelated metrics
4. Coverage reaches 100% at exactly 10x depth for all genomes
</div>

??? question "Show Answer"
    The correct answer is **B**. The Lander-Waterman model describes the relationship between sequencing depth ($c$) and coverage: the probability that any given base is not covered by at least one read is $P = e^{-c}$. At 30x depth, this probability is approximately $10^{-13}$, which is vanishingly small. In practice, coverage is not perfectly uniform due to GC bias, repetitive regions, and library preparation artifacts, so most projects aim for 30-50x depth.

    **Concept Tested:** Sequencing Depth and Coverage

---

#### 8. What is a haplotype, and why is phasing important in genomics?

<div class="upper-alpha" markdown>
1. A haplotype is a set of genetic variants found on the same chromosome; phasing determines which variants are on the same parental chromosome
2. A haplotype is a type of protein structure; phasing determines its folding order
3. A haplotype is a sequencing error pattern; phasing corrects these errors
4. A haplotype is the complete genome of a haploid organism; phasing converts diploid data to haploid
</div>

??? question "Show Answer"
    The correct answer is **A**. A haplotype is a set of genetic variants that are inherited together on the same physical chromosome. In a diploid organism, each individual carries two haplotypes at each locus (one maternal, one paternal). Phasing is the process of determining which variants co-occur on the same chromosome, which is critical for understanding compound heterozygosity in disease genetics and for constructing accurate pangenome graphs.

    **Concept Tested:** Haplotype and Phasing

---

#### 9. What is the critical trade-off when choosing the k-mer size for de Bruijn graph assembly?

<div class="upper-alpha" markdown>
1. Larger k increases sensitivity but decreases specificity
2. Smaller k produces longer contigs but requires more memory
3. Smaller k increases sensitivity (more overlaps) but also increases ambiguity; larger k improves specificity but requires higher coverage
4. K-mer size has no effect on assembly quality
</div>

??? question "Show Answer"
    The correct answer is **C**. The choice of $k$ involves a fundamental trade-off. Small values of $k$ produce more overlapping k-mers (higher sensitivity) but short k-mers are more likely to occur at multiple genomic positions (higher ambiguity), leading to tangled graphs. Large values of $k$ produce more unique k-mers (higher specificity) but require higher sequencing coverage to ensure every k-mer is observed. Most assemblers use $k$ values between 21 and 127, and some use multiple values iteratively.

    **Concept Tested:** K-mer

---

#### 10. What is a contig, and how does it relate to a scaffold in genome assembly?

<div class="upper-alpha" markdown>
1. A contig is a raw sequencing read; a scaffold is a quality-filtered read
2. A contig is a contiguous assembled sequence with no gaps; a scaffold orders and orients contigs with estimated gap sizes between them
3. A contig and a scaffold are identical terms used interchangeably
4. A contig is a chromosome-length sequence; a scaffold is a sub-chromosomal fragment
</div>

??? question "Show Answer"
    The correct answer is **B**. A contig (contiguous sequence) is an unambiguous assembled sequence with no gaps, derived from overlapping reads. A scaffold is a higher-order assembly unit that orders and orients multiple contigs using paired-end or mate-pair read information, with estimated gap sizes (represented as runs of Ns) between the contigs. Scaffolding improves the long-range contiguity of an assembly even when the underlying sequence has unresolved gaps.

    **Concept Tested:** Contig and Scaffold
