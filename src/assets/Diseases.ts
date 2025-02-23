const diseases = [
    {
        id: 1,
        name: 'C3 Glomerulonephritis',
        locations: [{id: 1, location: 'Troodos Mountains, Cyprus'}],
        alt_names: ['C3 Glomerulopathy 3', 'CFHR5 Nephropathy'],
        locus: 'CFHR5',
        omim: 'omim.org/entry/608593#0001',
        description: 'This very rare hereditary disease is only known to occur in people of Cypriot descent. All patients carry the same mutation; it seems to originate in the Troodos mountains in the center of this eastern Mediterranean island. The disease shows a so-called autosomal dominant inheritance pattern, which means it runs in families. The symptoms are caused by a gradual accumulation of the immune system protein C3 in the glomeruli, tiny filtering devices in the kidneys. Symptoms usually start manifesting themselves around the fourth decade of life. Over time, these kidney symptoms worsen. with 50 % of patients progressing to kidney failure within a decade if left untreated. A kidney transplantation can delay the process, but the disease has no cure.\n' +
            '\n' +
            'Carter & Nguyen have offered an explanation of why mutations linked to serious genetic diseases such as these still go around in some populations. The idea is that, apart from being linked to a disease, they also confer an evolutionary advantage to their carriers, leading to a trade-off. If this advantage is specific to a certain type of environment, over time this can result in a local accumulation of a mutation that is very rare or absent elsewhere. \n' +
            '\n' +
            'The general applicability of this model means that for a disease such as CFHR5 nephropathy, it makes sense to investigate the historical ecological circumstances in their geographical foci, in this case the Troodos mountains. Such study may reveal the ultimate cause of the disease, also called the selective agent, which caused the linked mutation to become so frequent there. \n' +
            '\n' +
            'There is good evidence that people in the Troodos mountains were historically exposed to something very specific: asbestos. This fibrous, toxic material was mined in the area as early as the Roman era, and occurs quite abundantly at the surface in the natural environment. The local inhabitants have traditionally used it for all kinds of purposes, such as clothing. shoes and even paint for their houses, unaware of its toxicity. It is likely the people in these mountains have been exposed to asbestos from an early age for centuries. This means a mutation with a protective effect could have spread there as a result of natural selection. \n' +
            '\n' +
            'This Darwinian interpretation of a rare disease cluster finds support in several independent lines of evidence. The CFHR5 gene that is mutated in patients codes for a protein called complement factor H related protein 5. As the name implies, this protein works closely together in the body with another protein called complement factor H, that plays a central role in the immune response to foreign substances such as asbestos. In fact, the function of complement factor H was first discovered after it was found to be present in the mesothelial fluid of patients with mesothelioma, the specific cancer type caused by asbestos. Apart from this piece of experimental evidence, genome scans of families of mesothelioma patients  show that variation in the CFHR5 gene is statistically associated with this cancer type.   \n' +
            '\n' +
            'For all of these reasons, we think it is likely that the Cypriot CFHR5 mutation confers protection from mesothelioma. If true, this would be a novel piece of knowledge with potential therapeutic implications for mesothelioma patients. Worldwide, this form of cancer gets diagnosed more than 30.000 times a year and takes decades to develop after exposure. If this lag period could be extended with the help of medication, this would be great news for patients. We think the possible gene-environment interaction between asbestos and CFHR5 presents a promising avenue for future drug development. Of course, we are far from sure that this approach will work, if only because of the kidney damage also caused by the mutation. Yet, given the size of the potential health benefits, we feel further research investment is warranted. The clue provided by a natural experiment on Cyprus may teach us something new about how the immune response to mesothelioma works. Something that can be perhaps be leveraged one day.\n' +
            '\n' +
            ' It is this kind of new knowledge that evolutionary health geography can generate.',
    },
    {
        id: 2,
        name: 'Transthyretin Amyloidosis',
        locations: [
            { id: 2, location: 'Southern West-Africa' },
            { id: 3, location: 'Alaró, Majorca, Spain' },
            { id: 4, location: 'Arao, Kumamoto, Japan' },
            { id: 5, location: 'Covilhã, Portugal' },
            { id: 6, location: 'Donegal province, Ireland' },
            { id: 7, location: 'Ogawa, Japan' },
            { id: 8, location: 'Póvoa de Varzim and Vila do Conde, Portugal' },
            { id: 9, location: 'Puente de Ixtla, Mexico' },
            { id: 10, location: 'San Luis de la Paz, Mexico' },
            { id: 11, location: 'Valverde del Camino, Spain' },
            { id: 12, location: 'Västerbotten and Norrbotten provinces, Sweden' },
            { id: 13, location: 'Vakarel, Bulgaria' }
        ],
        alt_names: [
            'Familial Amyloid Polyneuropathy',
            'Andrade disease',
            'Transthyretin-related hereditary amyloidosis',
            'hATTR',
            'Doença dos Pezinhos'
        ],
        locus: 'TTR',
        omim: 'omim.org/entry/105210',
        description: 'This hereditary disease is unusual because it seems to originate from only a few places in the world.\n' +
            '\n' +
            'In 2024, Per Roos and Sebastian Wärmländer of the Karolinska Institute in Stockholm, Sweden, remarked that the largest clusters of the disease have something in common: they are all located in or near ancient mining districts. They argue that this implies exposure to heavy metals may be one of its causes. If true, carriers of certain TTR mutations would be more likely to develop the disease when exposed to high levels of heavy metals. The authors do not specify which ones they think are the culprit.\n' +
            '\n' +
            'We are now undertaking field trips to several geographical foci of hATTR across Europe, in order to investigate whether specific exposures in those areas are in line with their generalization. We are led to ask: if heavy metals do play a role in etiology, why not include exposure to metals of industrial and other sources in the model? This may improve its explanatory power. And are heavy metals the only relevant environmental exposure?\n' +
            '\n' +
            'Roos and Wärmländer restrict their model to just one subtype of hATTR, associated with polyneuropathy. But what about geographical foci of the other major subtype of the disease, associated with cardiomyopathy? Do we find the same, or similar, environmental stressors there?\n' +
            '\n' +
            'These are some of the empirical questions raised by the interesting proposal of these two Swedish authors. We believe it does have predictive power, but can be improved upon with additional ecological research.\n' +
            '\n' // Provide additional information about this disease here for display on the detailed page
    },
];


export default diseases;