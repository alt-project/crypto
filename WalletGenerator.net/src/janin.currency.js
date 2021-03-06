var janin = {};

janin.currency = {
    createCurrency: function (name, networkVersion, privateKeyPrefix, WIF_Start, CWIF_Start, donate) {
        var currency = {};
        currency.name = name;
        currency.networkVersion = networkVersion;
        currency.privateKeyPrefix = privateKeyPrefix;
        currency.WIF_Start = WIF_Start;
        currency.CWIF_Start = CWIF_Start;
        currency.donate = donate;
        return currency;
    },
    
    name: function() {
        return janin.selectedCurrency.name;
    },

    networkVersion: function() {
        return janin.selectedCurrency.networkVersion;
    },
    
    privateKeyPrefix: function() {
        return janin.selectedCurrency.privateKeyPrefix;
    },
    
    WIF_RegEx: function() {
        return new RegExp("^" + janin.selectedCurrency.WIF_Start + "[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{50}$");
    },
    
    CWIF_RegEx: function() {
        return new RegExp("^" + janin.selectedCurrency.CWIF_Start + "[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{51}$");
    },
    
    // Switch currency
    useCurrency: function(index) {
        janin.selectedCurrency = janin.currencies[index];

        var coinImgUrl = "logos/" + janin.currency.name().toLowerCase() + ".png";
        document.getElementById("coinLogoImg").src = coinImgUrl;
        
        // Update title depending on currency
        document.title = janin.currency.name() + " " + ninja.translator.get("title");
        document.getElementById("siteTitle").alt = janin.currency.name() + " " + ninja.translator.get("title");
        
        // Update i18n link
        document.getElementById("cultureen").href = "?culture=en&currency=" + janin.currency.name().toLowerCase();
        document.getElementById("culturefr").href = "?culture=fr&currency=" + janin.currency.name().toLowerCase();

		if(ninja.seeder.isDone())
		{
			// Regenerate a new wallet when not expensive
			ninja.wallets.singlewallet.generateNewAddressAndKey();
			ninja.wallets.paperwallet.build(document.getElementById('paperpassphrase').value);
			ninja.wallets.brainwallet.view();
		}
        
        // Reset wallet tab when expensive or not applicable
        document.getElementById("bulktextarea").value = "";
		document.getElementById("suppliedPrivateKey").value = "";
        
        // easter egg doge ;)
        if(janin.currency.name() == "Dogecoin")
        {
            janin.doge = new Doge(['wow', 'so paper wallet', 'such random', 'very pretty', 'much design', 'awesome', 'much crypto', 'such coin', 'wow!!', 'to da moon']);
            return;
        }
        
        if(janin.doge != null)
        {
            janin.doge.stop();
            janin.doge = null;
        }
    },
};

janin.currencies = [
    //                    name, networkVersion, privateKeyPrefix, WIF_Start, CWIF_Start, donate
    janin.currency.createCurrency ("42coin",     0x08, 0x88, "5",    "M"    , "4Fs42jYtLYrUMfKEXc6arojuhRsnYnerxN"),
    janin.currency.createCurrency ("Acoin",      0x17, 0xe6, "8",    "b"    , "AJvChtExuvLgAor9aw1Xz9bkvJY7JKD9uL"),
    janin.currency.createCurrency ("Alphacoin",  0x52, 0xd2, "8",    "Y"    , "aAWhiGBDUugXC9ZBvw8CDNQH7KRurjy4Nq"),
    janin.currency.createCurrency ("Anoncoin",   0x17, 0x97, "6",    "P"    , "AS3BvkE4wvsXJpn1bGhQni5vZajthnrWQE"),
    janin.currency.createCurrency ("Apexcoin",   0x17, 0x97, "6",    "P"    , "AdPxUCGLDUhHUTGYftffwFVdxbFy2nkXGX"),
    janin.currency.createCurrency ("Auroracoin", 0x17, 0x97, "6",    "T"    , "AVWH1ZutLd4Y5LPDDj5FkBjbm2Gci4iFx3"),
    janin.currency.createCurrency ("Bitcoin",    0x00, 0x80, "5",    "[LK]" , "15DHZzv7eBUwss77qczZiL3DUEZLjDYhbM"),
    janin.currency.createCurrency ("Birdcoin",   0x2f, 0xaf, "6",    "[ST]" , "L97vGT4wRnyyiugHpLXzZzjqueN8YWRdRJ"),
    janin.currency.createCurrency ("Blackcoin",  0x19, 0x99, "6",    "P"    , "BFeJrZGyJ6bntd7RLXoNGvdn1HB5AQeiz4"),
    janin.currency.createCurrency ("BBQcoin",    0x55, 0xd5, "6",    "T"    , "bTFFC3Gg2XzQygLxxakHkNM3ravBZby1y9"),
    janin.currency.createCurrency ("CassubianDetk",0x1e,0x9e,"6",    "Q"    , "DBPagysmjfdkND4Zp1SM4myLenNfXpFWnG"),
    janin.currency.createCurrency ("Catcoin",    0x15, 0x95, "[56]", "P"    , "9rEXDemG6S3k2ddAsKFzRpnMVz3bVryYXZ"),
    janin.currency.createCurrency ("Corgicoin",  0x1c, 0x9c, "6",    "Q"    , "CNwV11TaKrfB3TnBS8vQjNbWT6CNxV8GBi"),
    janin.currency.createCurrency ("Darkcoin",   0x4c, 0xcc, "7",    "X"    , "XdYX6AbDzjb3AVL1tAmWjuYMD28LD9fcWS"),
    janin.currency.createCurrency ("Devcoin",    0x00, 0x80, "5",    "[LK]" , "1GUeBfpVhN7xySQej3HiSe5c8jQoVQPosv"),
    janin.currency.createCurrency ("Digitalcoin",0x1e, 0x9e, "6",    "Q"    , "D7fJwPfW4dFSJNq4NHbMiYJhYnrZehMpqx"),
    janin.currency.createCurrency ("Dogecoin",   0x1e, 0x9e, "6",    "Q"    , "D74Npoqhwhjw9fShkm5wbj6DD2BJXpmzPj"),
    janin.currency.createCurrency ("eGulden",    0x30, 0xb0, "6",    "T"    , "LhBsKs2GUb24KBAzZfua5AsqfQF5uPdWXQ"),
    janin.currency.createCurrency ("eKrona",     0x2d, 0xad, "6",    "S"    , "KLi8FnMZmSH8EfXYgJwi4R2ZyMscJykXT5"),
    janin.currency.createCurrency ("Fastcoin",   0x60, 0xe0, "8",    "a"    , "frxe8F7gQdiAVgy4mRXjpXH5vN1wyta1db"),
    janin.currency.createCurrency ("Feathercoin",0x0e, 0x8e, "5",    "N"    , "6dxAP6oacHsove5X2kZPpddcT1Am167YzC"),
	janin.currency.createCurrency ("Fibre",      0x23, 0xa3, "6",    "R"    , "F6qGSM29vJm2q3Q9uvozpym7WYqKXBrpqm"),
    janin.currency.createCurrency ("Fluttercoin",0x23, 0xa3, "6",    "R"    , "FJioRLt3gLtqk3tUdMhwjAVo1sdWjRuwqt"),
    janin.currency.createCurrency ("Freicoin",   0x00, 0x80, "5",    "[LK]" , "18kVnAk5Undi7CqEgGx63YDKBPFpxYJmT9"),
    janin.currency.createCurrency ("Fuelcoin",   0x24, 0x80, "5",    "[KL]" , "Fq1sL24MgDt7tTiKh8MPvhz2UMP8e1uCo4"),
    janin.currency.createCurrency ("GlobalBoost",0x26, 0xa6, "6",    "R"    , "GeXdH1WhzA7ayYim9sdCCQKcVukUq1W8LJ"),
    janin.currency.createCurrency ("Goodcoin",   0x26, 0xa6, "6",    "R"    , "GM3kAbQGaMVAYk8U3CrVGhSwz1hZaF6gVM"),
    janin.currency.createCurrency ("Gridcoin",   0x25, 0xa5, "6",    "R"    , "FyYkg3xhJVcVzMMw8JKfQaBxA9DAVhivq4"),
    janin.currency.createCurrency ("Guldencoin", 0x26, 0xa6, "6",    "R"    , "GLD7BDBYyddx6Sr72zGfreRG21dJAe74j8"),
    janin.currency.createCurrency ("Guncoin",    0x27, 0xa7, "6",    "R"    , "GwVej6c3tF9GqEdSKmwJiUDWtQVK2wY9fP"),
    janin.currency.createCurrency ("HTML5Coin",  0x28, 0xa8, "6",    "R"    , "HBUk5NzWyemrwLffC8pLFXabbJuMRKbkc7"),
    janin.currency.createCurrency ("iXcoin",     0x8a, 0x80, "5",    "[LK]" , "xnF1nshqFLaVdDGBmQ4k2jBQkr8nbuCkLz"),
    janin.currency.createCurrency ("Judgecoin",  0x2b, 0xab, "6",    "S"    , "JbF9ZnvoFkBdasPEq21jCCTnTUDSiyWrAQ"),
    janin.currency.createCurrency ("Jumbucks",   0x2b, 0xab, "6",    "S"    , "Jg1cc9v6GbyDLt9YfuVHbkrrUEzmUeY4iY"),
    janin.currency.createCurrency ("Litecoin",   0x30, 0xb0, "6",    "T"    , "LiScnsyPcqsyxn1fx92BcFguryXcw4DgCy"),
    janin.currency.createCurrency ("MagicInternetMoney", 0x30, 0xb0,"6", "T", "LPRqCTYEy53FkEzhRTCauLc7Qq23Z5mxZU"),
    janin.currency.createCurrency ("Marscoin",   0x32, 0xb2, "6",    "T"    , "M8caDttyKt2r7V7WHMMkRZ1jEzxj16fgCn"),
    janin.currency.createCurrency ("Mazacoin",   0x32, 0xe0, "8",    "a"    , "MLUXCv3GfNgmUSXc5Ek3ePaQ4cfsJwEXHa"),
    janin.currency.createCurrency ("Megacoin",   0x32, 0xb2, "6",    "T"    , "MPeVmJHvkXN3caneWCB5zGgtGHRRBSLmWd"),
    janin.currency.createCurrency ("Monocle",    0x32, 0xb2, "6",    "T"    , "M9CFHZjyCipuKqByD5K1sCHmt7etuCFGsc"),
    janin.currency.createCurrency ("Myriadcoin", 0x32, 0xb2, "6",    "T"    , "MWGDtjDw9c8C6zicDQF22yZBWbEX53v4o9"),
    janin.currency.createCurrency ("NameCoin",   0x34, 0x80, "5",    "[LK]" , "NASxLK4nt5hgX9wQEny5qPPJ2q4uSGCvT9"),
    janin.currency.createCurrency ("Novacoin",   0x08, 0x88, "5",    "M"    , "4EZMrEA5LnmwtcK5b2JfCq9k5YS4ZVZrtT"),
    janin.currency.createCurrency ("Onyxcoin",   0x73, 0xf3, "9",    "[cd]" , "odRRCGXooJvKs7cn7sax1bJv9EJwwEy94Z"),
    janin.currency.createCurrency ("Pandacoin",  0x37, 0xb7, "7",    "U"    , "PT6guZjCgsrBkqCUhTnG1NNBYBqgzo8gVv"),
    janin.currency.createCurrency ("PHCoin",     0x37, 0xb7, "7",    "[LK]" , "P9e6c714JUHUfuBVHSS36eqaxGCN6X8nyU"),
    janin.currency.createCurrency ("Peercoin",   0x37, 0xb7, "7",    "[LK]" , "PSnwUwknbmqUU1GCcM1DNxcANqihpdt3tW"),
    janin.currency.createCurrency ("Potcoin",    0x37, 0xb7, "7",    "U"    , "PQcMNuCdeooMcS5H3DGwxXnSE2kmyVMU39"),
    janin.currency.createCurrency ("Primecoin",  0x17, 0x97, "6",    "P"    , "AbXChfoHyFESePFuVh1xLZdn7Rj1mfD2a4"),
    janin.currency.createCurrency ("Reddcoin",   0x3d, 0xbd, "7",    "[UV]" , "RmAB99NsX6Wbjk5WdqNeEab83y72d7zkqZ"),
	janin.currency.createCurrency ("Titcoin",    0x00, 0x80, "5",    "[LK]" , "1CHAo7muicsLHdPk5q4asrEbh6aUeSPpdC"),
    janin.currency.createCurrency ("Topcoin",    0x42, 0xc2, "7",    "V"    , "TmDTsQqqv1LWGw4xjGNiJ7ABwdCenf2BFF"),
    janin.currency.createCurrency ("TreasureHuntCoin",0x32,0xb2,"6", "T"    , "MKnC2upgCNfVMS2phkV8SqGaXUGkn39EaX"),
    janin.currency.createCurrency ("Unobtanium", 0x82, 0xe0, "8",    "a"    , "uZ8Gq61NGJ2wz3PLybXyXKLYC1FhRpz8Kq"),
    janin.currency.createCurrency ("Vertcoin",   0x47, 0xc7, "7",    "W"    , "VkmBz8JJWLP1sVH9sGwc1Fz7o5RtXLW4J5"),
    janin.currency.createCurrency ("VikingCoin", 0x46, 0x56, "3",    "D"    , "VJXz1cD1mDGQmu52aDdd7Q2G5ejqA6mcqw"),
	janin.currency.createCurrency ("W2Coin",     0x49, 0xc9, "7",    "W"    , "Wa3AvKUP5J3BpEa93nwKHPAAQ2P1XdTCeU"),
    janin.currency.createCurrency ("WeAreSatoshiCoin", 0x87,0x97,"6","P"    , "wSEgPsCGqQESLDyzBJkwCXvMP1z3e1Qi3X"),
    janin.currency.createCurrency ("Zetacoin",   0x50, 0xE0, "8",    "a"    , "ZRU6TP8NLzoyey4DPPaa3uCCgDNDc96PXJ"),

    janin.currency.createCurrency ("Testnet Bitcoin", 0x6f, 0xef, "9", "c", null)
                   ];
