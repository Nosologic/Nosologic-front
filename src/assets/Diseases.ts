const diseases = [
    {
        id: 1,
        visibility: false,
        name: 'C3 Glomerulonephritis',
        locations: [{id: 1, location: 'Troodos Mountains, Cyprus', visibility: false}],
        table_data: {
            alt_names: ['C3 Glomerulopathy 3', 'CFHR5 Nephropathy'],
            locus: ['CFHR5', 'ABC'],
            mondo: ['https://monarchinitiative.org/MONDO:0013892', 'monarchinitiative.org/MONDO:0013892'],
        },

        text_data: {
            description: `
This very rare hereditary disease is only known to occur in people of Cypriot descent. All patients carry the same mutation; it seems to originate in the Troodos mountains in the center of this eastern Mediterranean island. The disease shows a so-called autosomal dominant inheritance pattern, which means it runs in families. The symptoms are caused by a gradual accumulation of the immune system protein C3 in the glomeruli, tiny filtering devices in the kidneys. Symptoms usually start manifesting themselves around the fourth decade of life. Over time, these kidney symptoms worsen, with 50% of patients progressing to kidney failure within a decade if left untreated. A kidney transplantation can delay the process, but the disease has no cure.

Carter & Nguyen have offered an explanation of why mutations linked to serious genetic diseases such as these still go around in some populations. The idea is that, apart from being linked to a disease, they also confer an evolutionary advantage to their carriers, leading to a trade-off. If this advantage is specific to a certain type of environment, over time this can result in a local accumulation of a mutation that is very rare or absent elsewhere.

The general applicability of this model means that for a disease such as CFHR5 nephropathy, it makes sense to investigate the historical ecological circumstances in their geographical foci, in this case the Troodos mountains. Such study may reveal the ultimate cause of the disease, also called the selective agent, which caused the linked mutation to become so frequent there.

There is good evidence that people in the Troodos mountains were historically exposed to something very specific: asbestos. This fibrous, toxic material was mined in the area as early as the Roman era, and occurs quite abundantly at the surface in the natural environment. The local inhabitants have traditionally used it for all kinds of purposes, such as clothing, shoes, and even paint for their houses, unaware of its toxicity. It is likely the people in these mountains have been exposed to asbestos from an early age for centuries. This means a mutation with a protective effect could have spread there as a result of natural selection.

This Darwinian interpretation of a rare disease cluster finds support in several independent lines of evidence. The CFHR5 gene that is mutated in patients codes for a protein called complement factor H related protein 5. As the name implies, this protein works closely together in the body with another protein called complement factor H, that plays a central role in the immune response to foreign substances such as asbestos. In fact, the function of complement factor H was first discovered after it was found to be present in the mesothelial fluid of patients with mesothelioma, the specific cancer type caused by asbestos. Apart from this piece of experimental evidence, genome scans of families of mesothelioma patients show that variation in the CFHR5 gene is statistically associated with this cancer type.

For all of these reasons, we think it is likely that the Cypriot CFHR5 mutation confers protection from mesothelioma. If true, this would be a novel piece of knowledge with potential therapeutic implications for mesothelioma patients. Worldwide, this form of cancer gets diagnosed more than 30,000 times a year and takes decades to develop after exposure. If this lag period could be extended with the help of medication, this would be great news for patients. We think the possible gene-environment interaction between asbestos and CFHR5 presents a promising avenue for future drug development. Of course, we are far from sure that this approach will work, if only because of the kidney damage also caused by the mutation. Yet, given the size of the potential health benefits, we feel further research investment is warranted. The clue provided by a natural experiment on Cyprus may teach us something new about how the immune response to mesothelioma works. Something that can perhaps be leveraged one day.

It is this kind of new knowledge that evolutionary health geography can generate.
`,
        },

    },
    {
        id: 2,
        visibility: false,
        name: 'Transthyretin Amyloidosis',
        locations: [
            {id: 2, location: 'Southern West-Africa', visibility: false},
            {id: 3, location: 'Alaró, Majorca, Spain', visibility: false},
            {id: 4, location: 'Arao, Kumamoto, Japan', visibility: false},
            {id: 5, location: 'Covilhã, Portugal', visibility: false},
            {id: 6, location: 'Donegal province, Ireland', visibility: false},
            {id: 7, location: 'Ogawa, Japan', visibility: false},
            {id: 8, location: 'Póvoa de Varzim and Vila do Conde, Portugal', visibility: false},
            {id: 9, location: 'Puente de Ixtla, Mexico', visibility: false},
            {id: 10, location: 'San Luis de la Paz, Mexico', visibility: false},
            {id: 11, location: 'Valverde del Camino, Spain', visibility: false},
            {id: 12, location: 'Västerbotten and Norrbotten provinces, Sweden', visibility: false},
            {id: 13, location: 'Vakarel, Bulgaria', visibility: false}
        ],
        table_data: {
            alt_names: [
                'Familial Amyloid Polyneuropathy',
                'Andrade disease',
                'Transthyretin-related hereditary amyloidosis',
                'hATTR',
                'Doença dos Pezinhos'
            ],
            locus: ['TTR'],
            mondo: ['https://omim.org/entry/105210', 'omim.org/entry/105210'],
        },

        text_data: {
            description: `
This hereditary disease is unusual because it seems to originate from only a few places in the world.

In 2024, Per Roos and Sebastian Wärmländer of the Karolinska Institute in Stockholm, Sweden, remarked that the largest clusters of the disease have something in common: they are all located in or near ancient mining districts. They argue that this implies exposure to heavy metals may be one of its causes. If true, carriers of certain TTR mutations would be more likely to develop the disease when exposed to high levels of heavy metals. The authors do not specify which ones they think are the culprit.

We are now undertaking field trips to several geographical foci of hATTR across Europe, in order to investigate whether specific exposures in those areas are in line with their generalization. We are led to ask: if heavy metals do play a role in etiology, why not include exposure to metals of industrial and other sources in the model? This may improve its explanatory power. And are heavy metals the only relevant environmental exposure?

Roos and Wärmländer restrict their model to just one subtype of hATTR, associated with polyneuropathy. But what about geographical foci of the other major subtype of the disease, associated with cardiomyopathy? Do we find the same, or similar, environmental stressors there?

These are some of the empirical questions raised by the interesting proposal of these two Swedish authors. We believe it does have predictive power, but can be improved upon with additional ecological research.`,
            causes: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
            consequences: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
            treatment: `ABCDEFGHIJKLMNOPQRSTUVWXYZ`,
        },
    },
    {
        id: 3,
        visibility: true,
        name: 'Familial hypercholesterolemia',
        locations: [
            { id: 14, location: 'Oaxaca, Mexico', visibility: true },
            { id: 15, location: 'West-Friesland, Netherlands', visibility: false },
            { id: 16, location: 'Noord and Zuid Beveland, Netherlands', visibility: false }
        ],
        table_data: {
            alt_names: [
                'Familial defective apolipoprotein B-100',
            ],
            locus: ['LDLR', 'ApoB', 'PCSK9'],
            mondo: ['https://monarchinitiative.org/MONDO:0005439', 'monarchinitiative.org/MONDO:0005439'],
        },
        text_data: {
            description: `One of the most common, if not the most common, hereditary disease in the world. It is characterized by more than twofold elevated ldl-c cholesterol levels, already at birth. This leads to atherosclerosis, often resulting in cardiovascular disease, heart attacks and strokes.

Carrying just one pathogenic variant at the LDLR, ApoB and PCSK9 loci is enough to be at risk. This means that parents, siblings and children of a carrier all have a 50% chance of being a carrier as well, an inheritance pattern called autosomal dominant.  Because the disease can be treated with statins and other forms of lipid lowering medication, which considerably enhances the life expectancy of patients, proactive diagnosis and screening can save lives. Accurate knowledge of geographical and ethnic clusters of the disease can help with this task.

`
        },
    },
];


export default diseases;