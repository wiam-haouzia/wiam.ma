var multilang = {
    langs: [ 'fr' , 'en' ],
    currentLocal: 'en',
    btn_selector: ".local_selector",
    data : {
        "fr" : {
            "experience_education" : "Formations & Éxpériences",
            "skills": "Compétences",
            "projects": "Projcts",
            "contact": "Contact",
            "caption_title": "UI/UX Designer",
            "caption_subtitle": "& Développeuse front-end",
            "caption_body": "Salut, <br> Je suis <strong class=\"bold-text\">WIAM HAOUZIA</strong> UI/UX designer et Développeuse front-end Marocaine, Veuillez vérifier mes projets et je serai heureuse de rendre vos idées plus belles",
            "caption_btn": "Mes Projets",
            't_professional_experience': "Éxpériences professionnelles",
            "pro_exp_1_title": "UI/UX Designer <i class=\"fas fa-map-marker-alt\"></i> Softseventart",
            "pro_exp_1_date": "Septembre 2019 - Présent",
            "pro_exp_2_title": "Enseignant du Développement Web <i class=\"fas fa-map-marker-alt\"></i> CEIT",
            "pro_exp_2_date": "Avril - Juillet 2019",
            "pro_exp_3_title": "Assistante Marketinganglophone <i class=\"fas fa-map-marker-alt\"></i> EDMARK MOROCCO",
            "pro_exp_3_date": "Septembre - Octobre 2018",
            "pro_exp_4_title": "Stagiaire en Infographie & Développement Web<br><i class=\"fas fa-map-marker-alt\"></i> ICOZ",
            "pro_exp_4_date": "Février - Aôut 2018",
            "t_education": 'Éducation',
            "ed_1_title": "Compétitrice au Olympiades internationales aux Technologies Web <i class=\"fas fa-map-marker-alt\"></i> WORLDKILLS 2019",
            "ed_1_date": "Novembre 2018 - Mars 2019",
            "ed_2_title": "Diplôme de TS en développement Multimedia<br><i class=\"fas fa-map-marker-alt\"></i> ISAG",
            "ed_2_date": "Juillet 2018",
            "ed_3_title": "Baccalauréat <i class=\"fas fa-map-marker-alt\"></i> Lycée agricole F.B.S",
            "ed_3_date": "Juillet 2016",
            "t_online_certifications" : "Certificats en ligne",
            "t_skills": "Compétences",
            "t_projects": "Projets",
            "filter_all": "Tout",
            "filter_uiux_design": "UI/UX Design",
            "filter_graphic_design": "Infographie",
            "filter_web_development": "Développement Front-End",
            "filter_games": "Jeux",
            "t_contact": "<span>N'hésitez pas à</span> <br>Me contacter",
            "contact_nom": "Nom <small>*</small>",
            "contact_email": "Email <small>*</small>",
            "contact_sujet": "Sujet <small>*</small>",
            "contact_message": "Message <small>*</small>",
        },
        "en" : {
            "experience_education" : "Experience & Education",
            "skills": "Skills",
            "projects": "Projects",
            "contact": "Contact",
            "caption_title": "UI/UX Designer",
            "caption_subtitle": "& front-end developer",
            "caption_body": "Hi There, <br> I'm <strong class=\"bold-text\">WIAM HAOUZIA</strong> a Moroccan UI/UX designer and Front-End Developer, Check my projects and I will be glad to make your ideas look beautiful",
            "caption_btn": "My Projects",
            't_professional_experience': "Professional Experience",
            "pro_exp_1_title": "UI/UX Designer <i class=\"fas fa-map-marker-alt\"></i> Softseventart",
            "pro_exp_1_date": "September 2019 - Now",
            "pro_exp_2_title": "Web development Instructor <i class=\"fas fa-map-marker-alt\"></i> CEIT",
            "pro_exp_2_date": "April - July 2019",
            "pro_exp_3_title": "Anglophone Marketing Assistant <i class=\"fas fa-map-marker-alt\"></i> EDMARK MOROCCO",
            "pro_exp_3_date": "September - October 2018",
            "pro_exp_4_title": "Intern Web developer & Designer <i class=\"fas fa-map-marker-alt\"></i> ICOZ",
            "pro_exp_4_date": "February - August 2018",
            "t_education": 'Education',
            "ed_1_date": "Web technologies Competitor <i class=\"fas fa-map-marker-alt\"></i> WORLDKILLS 2019",
            "ed_1_date": "November 2018 - March 2019",
            "ed_2_date": "Associate's degree in Multimedia Development <i class=\"fas fa-map-marker-alt\"></i> ISAG",
            "ed_2_date": "July 2018",
            "ed_3_date": "High School degree <i class=\"fas fa-map-marker-alt\"></i> Agronomic School F.B.S",
            "ed_3_date": "July 2016",
            "t_online_certifications" : "Online Certificates",
            "t_skills": "Skills",
            "t_projects": "Projects",
            "filter_all": "All",
            "filter_uiux_design": "UI/UX Design",
            "filter_graphic_design": "Graphic Design",
            "filter_web_development": "Front-End Development",
            "filter_games":"Games",
            "t_contact": "<span>Now, You know me enough to</span> <br>Contact me",
            "contact_nom": "Name <small>*</small>",
            "contact_email": "Email <small>*</small>",
            "contact_sujet": "Subject <small>*</small>",
            "contact_message": "Message <small>*</small>",
        },
    },
    getLang: function(){
        return localStorage.getItem('lang');
    },
    setLang: function($local){
        localStorage.setItem('lang', this.data[$local] ? $local : this.currentLocal );
        this.currentLocal = $local;
        multilang = this;
    },
    getValue:function($key){
        return this.data[ this.currentLocal ][$key];
    },
    events: function () { 
        $(document).on('click', this.btn_selector , function (e) {
            e.preventDefault();
            
            var selected_local = $(e.target).attr('data-local');
            if (!multilang.data[selected_local] || selected_local == multilang.currentLocal) return false;
            multilang.setLang(selected_local);

            $('[data-lkey]').each(function (i, elem) {
                var lkey = $(elem).data('lkey');
                var key_value = multilang.getValue(lkey);
                if (key_value) $(elem).html( key_value );
            });

            // change active btn
            $(multilang.btn_selector).removeClass('active');
            $(e.target).addClass('active');
        });
    },
    oninit: function () { 
        var storage_local = localStorage.getItem('lang');
        this.setLang(storage_local);

        $('[data-lkey]').each(function (i, elem) {
            var lkey = $(elem).data('lkey');
            var key_value = multilang.getValue(lkey);
            if (key_value) $(elem).html( key_value );
        });

        // change active btn
        $(this.btn_selector).each(function (i, elem) {
            var selected_local = $(elem).attr('data-local');
            if ( selected_local != multilang.currentLocal){
                $(elem).removeClass('active');
            } else{ $(elem).addClass('active'); }
        });

        this.events();
    }
}
multilang.oninit();