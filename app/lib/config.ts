// Site configuration - migrated from HTML project
export const siteConfig = {
    siteSettings: {
        themeColor: "#0056b3",
        accentColor: "#ff6b00",
        darkModeEnabled: true,
        showProjectsSection: true,
    },
    company: {
        name: "Kugan Tech Works",
        icon: "fas fa-cogs",
        tagline: "Precision Engineering & Sourcing",
        heroImage: "/bg_01.png",
        heroTitle: "Engineering the Vision",
        heroSub: "Manufacture the future, Supply the best.",
    },
    about: {
        description:
            "At KuganTech, we are more than just a manufacturing and sourcing company. We are a bridge between your vision and the future. We engineer the vision, Our team of experts collaborates with you to translate your ideas into tangible plans. We manufacture the future with cutting-edge technology and a commitment to quality, we turn those plans into innovative products that shape the future. We supply the best, We source the finest materials and employ efficient processes to deliver exceptional products that meet the highest standards.\n\nWe are here to engineer the vision, manufacture the future, and supply the best.",
        image:
            "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        showMission: false,
        missionText: "",
    },
    services: [
        {
            id: "product-design",
            title: "Product Design",
            shortDesc:
                "Comprehensive design services including Detailed Engineering and Value Engineering.",
            fullDesc:
                "Our Product Design services cover the entire lifecycle from concept to creation. We specialize in Design and Development, Detail Engineering, and Value Engineering & Analysis to ensure your products are optimized for performance and cost.",
            image:
                "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            hasExperience: true,
            experienceText: "Award-winning design for automotive components.",
        },
        {
            id: "engineering-analysis",
            title: "Engineering Analysis",
            shortDesc:
                "Advanced simulation and analysis tailored for complex engineering challenges.",
            fullDesc:
                "We utilize state-of-the-art tools for Finite Element Analysis (FEA), Computational Fluid Dynamics (CFD), Multi-Body Dynamics (MBD), and Acoustics to validate and improve designs before prototyping.",
            image:
                "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            hasExperience: true,
            experienceText: "CFD analysis for high-speed rail projects.",
        },
        {
            id: "product-development",
            title: "Product Development",
            shortDesc: "From prototyping to manufacturing engineering.",
            fullDesc:
                "Our Product Development capabilities include Tool and Mold Design, Rapid Prototyping & Testing, and Manufacturing Engineering to streamline your production process.",
            image:
                "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            hasExperience: false,
        },
        {
            id: "automotive",
            title: "Automotive Engineering",
            shortDesc: "Specialized solutions for the automotive industry.",
            fullDesc:
                "Our automotive expertise includes Aerodynamics, Under-hood & Under-body analysis, Engine Lubrication & Cooling, and Passenger Comfort & Safety Systems (Airbags, Steering Wheels).",
            image:
                "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            hasExperience: false,
        },
        {
            id: "heavy-equipment",
            title: "Heavy Equipment",
            shortDesc:
                "Engineering for farm, construction, and material handling.",
            fullDesc:
                "We provide robust engineering solutions for Farm Equipments, Construction Machinery, and Material Handling Equipments designed to withstand rigorous operational environments.",
            image:
                "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            hasExperience: true,
            experienceText: "Hydraulic system optimization for excavators.",
        },
    ],
    projects: [
        {
            title: "Auto Plant Overhaul",
            desc: "Complete conveyor belt replacement.",
            image:
                "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        },
        {
            title: "Refinery Pipeline",
            desc: "High-pressure valve installation.",
            image:
                "https://images.unsplash.com/photo-1574689211272-bc14e289e223?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        },
        {
            title: "Generator Setup",
            desc: "Backup power installation for hospital.",
            image:
                "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        },
    ],
    contact: {
        phone: "+91 9790525321",
        email: "kugantechworks@gmail.com",
        address: "123 Industrial Ave, Tech District, NY 10001",
        mapLink: "https://maps.google.com",
    },
};

export type Service = (typeof siteConfig.services)[number];
export type Project = (typeof siteConfig.projects)[number];
