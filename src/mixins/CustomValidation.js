export default {
    data() {
        return {
            cmessage: "",
        }
    },
    methods: {
        getFormDataField(data) {
            let count = 0;
            let txt = "";
            Object.keys(data).forEach((item) => {
                if (data[item]) {
                    count += 1;
                }
                else {
                    let str = item.split("_").join(" ");
                    txt += str + " must be required <br>";
                }
            });

            if ((Object.keys(data).length) == count) {
                return true;
            }
            else {
                this.cmessage = txt;
            }

        }
    }
}
