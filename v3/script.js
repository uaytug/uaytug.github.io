// script.js
new Vue({
    el: '#app',
    data: {
        name: '',
        jobTitle: '',
        jobDescription: '',
        skills: [],
        works: [],
        education: [],
        experience: [],
        hobbies: [],
        contacts: {}
    },
    created() {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                this.name = data.name;
                this.jobTitle = data.jobTitle;
                this.jobDescription = data.jobDescription;
                this.skills = data.skills;
                this.works = data.works;
                this.education = data.education;
                this.experience = data.experience;
                this.hobbies = data.hobbies;
                this.contacts = data.contacts;
            });
    }
});
