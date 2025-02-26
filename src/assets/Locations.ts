const locations = [
    {
        id: 8,
        name: "Póvoa de Varzim and Vila do Conde, Portugal",
        table_data: {
            disease: "Hereditary transthyretin amyloidosis",
            phenotype: "Polyneuropathy",
            gene: "TTR",
            variant: "Val50Met",
            // all the links must be in the following format
            // key (displayed label): [link it points to, the displayed text]
            // this is the record for reference at https://nosologic.netlify.app/clusters/8
            reference: ["https://onlinelibrary.wiley.com/doi/abs/10.1002/ajmg.1320600606", "Sousa et al. 1995"],
        },
        text_data: {
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. 
            Nulla facilisi. Praesent ac magna sit amet metus condimentum volutpat. 
            Vivamus varius nunc ac orci cursus, id auctor sem consequat. Nullam at metus sit 
            amet turpis ornare efficitur. Mauris tempus sollicitudin ligula, sed imperdiet purus 
            tincidunt et. Integer sodales scelerisque nibh vel congue. Curabitur vitae venenatis 
            urna. Sed pellentesque turpis nec erat accumsan, a varius libero tempus. Aliquam vel 
            magna sit amet arcu faucibus vestibulum in vitae ligula. Pellentesque habitant morbi 
            tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque est 
            augue, tincidunt ut nisl id, tincidunt tempus lacus. Nulla varius elit nisi, vitae 
            faucibus mauris vehicula id.
    
            Donec egestas libero sit amet nulla congue, nec interdum dolor tempor. Ut tincidunt 
            mi ligula, ac laoreet tellus semper nec. Pellentesque volutpat odio ut augue mollis 
            congue. Proin eu augue convallis, facilisis nisl id, scelerisque ex. Vivamus tempor 
            mattis sapien, et dignissim risus sodales gravida. Praesent fringilla lectus arcu, 
            nec facilisis nulla laoreet eu. Donec consectetur, tortor nec fermentum accumsan, 
            libero lorem tincidunt massa, vel sagittis lacus eros quis tellus. Sed quis commodo 
            metus. Integer ac justo eu ligula pellentesque ultrices. Aenean facilisis magna vel 
            orci cursus convallis. Aliquam erat volutpat. Nulla erat tortor, commodo non leo et, 
            mollis pellentesque ipsum. Fusce in pharetra libero, eu posuere sapien. Nullam nec 
            sem dui.
    
            Proin fermentum, libero eget fermentum pharetra, est neque efficitur tortor, nec 
            facilisis elit neque in nulla. Vivamus volutpat urna fermentum fermentum gravida. 
            Quisque ultrices egestas tellus, at tristique turpis porta a. Suspendisse malesuada 
            elementum diam. Cras ultricies ex ut odio porttitor, et sollicitudin augue pharetra. 
            Duis porttitor eget nisi quis scelerisque. Praesent tincidunt orci vel sapien 
            pellentesque, nec aliquet purus gravida. Suspendisse sed nisl sed libero imperdiet 
            dictum id id nulla. Vivamus scelerisque sapien a nibh sodales, sit amet sodales nunc 
            facilisis. Donec vehicula est lectus, ac pretium arcu convallis sit amet. Etiam 
            pellentesque vel enim non gravida.
    
            Nam convallis purus eu eros tristique facilisis vitae vitae sem. Quisque scelerisque 
            suscipit risus, a vulputate est aliquam et. Cras risus magna, posuere vel tincidunt eu, 
            dignissim et magna. Cras at congue felis. Aenean convallis nunc nec velit convallis 
            pretium. Mauris pharetra velit eget nisi iaculis interdum. Proin ut dolor lorem. Donec 
            ornare commodo nisi, nec luctus metus feugiat vel. Integer laoreet augue ultrices, 
            gravida mi id, pharetra libero. Duis ac orci id dui fermentum pharetra nec nec nibh. 
            Proin vel nisi lorem. Orci varius natoque penatibus et magnis dis parturient montes, 
            nascetur ridiculus mus. Maecenas hendrerit nulla justo, et vehicula velit egestas in.
    
            Sed iaculis nulla eget eros auctor maximus. Donec in sagittis erat, quis aliquam ligula. 
            Donec consequat dignissim faucibus. Maecenas sollicitudin, justo eu viverra fringilla, 
            odio ex faucibus mauris, id aliquet nisl nunc et lectus. Suspendisse potenti. Ut quis 
            ornare dui. Curabitur sit amet turpis lectus. Proin accumsan sagittis eros, a semper 
            justo aliquet porta. Nam malesuada quis nulla sed ultrices. In vel auctor ligula. 
            Duis fringilla ex ut ex commodo, eget feugiat neque interdum. Integer venenatis arcu 
            id tincidunt condimentum. Cras finibus ligula in ligula varius dapibus. In luctus ut 
            velit non blandit. Sed venenatis pretium vehicula.
            `,
            causes: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
            notes: `abracadabra`,
        }

    }
]

export default locations;
