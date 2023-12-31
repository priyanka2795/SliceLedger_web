<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('countries')->insert([
			['name' => 'Afghanistan', 'abv' => 'AF', 'abv3' => 'AFG', 'abv3_alt' => null, 'code' => 4, 'slug' => 'afghanistan'],
			['name' => 'Aland Islands', 'abv' => 'AX', 'abv3' => 'ALA', 'abv3_alt' => null, 'code' => 248, 'slug' => 'aland-islands'],
			['name' => 'Albania', 'abv' => 'AL', 'abv3' => 'ALB', 'abv3_alt' => null, 'code' => 8, 'slug' => 'albania'],
			['name' => 'Algeria', 'abv' => 'DZ', 'abv3' => 'DZA', 'abv3_alt' => null, 'code' => 12, 'slug' => 'algeria'],
			['name' => 'American Samoa', 'abv' => 'AS', 'abv3' => 'ASM', 'abv3_alt' => null, 'code' => 16, 'slug' => 'american-samoa'],
			['name' => 'Andorra', 'abv' => 'AD', 'abv3' => 'AND', 'abv3_alt' => null, 'code' => 20, 'slug' => 'andorra'],
			['name' => 'Angola', 'abv' => 'AO', 'abv3' => 'AGO', 'abv3_alt' => null, 'code' => 24, 'slug' => 'angola'],
			['name' => 'Anguilla', 'abv' => 'AI', 'abv3' => 'AIA', 'abv3_alt' => null, 'code' => 660, 'slug' => 'anguilla'],
			['name' => 'Antigua and Barbuda', 'abv' => 'AG', 'abv3' => 'ATG', 'abv3_alt' => null, 'code' => 28, 'slug' => 'antigua-and-barbuda'],
			['name' => 'Argentina', 'abv' => 'AR', 'abv3' => 'ARG', 'abv3_alt' => null, 'code' => 32, 'slug' => 'argentina'],
			['name' => 'Armenia', 'abv' => 'AM', 'abv3' => 'ARM', 'abv3_alt' => null, 'code' => 51, 'slug' => 'armenia'],
			['name' => 'Aruba', 'abv' => 'AW', 'abv3' => 'ABW', 'abv3_alt' => null, 'code' => 533, 'slug' => 'aruba'],
			['name' => 'Australia', 'abv' => 'AU', 'abv3' => 'AUS', 'abv3_alt' => null, 'code' => 36, 'slug' => 'australia'],
			['name' => 'Austria', 'abv' => 'AT', 'abv3' => 'AUT', 'abv3_alt' => null, 'code' => 40, 'slug' => 'austria'],
			['name' => 'Azerbaijan', 'abv' => 'AZ', 'abv3' => 'AZE', 'abv3_alt' => null, 'code' => 31, 'slug' => 'azerbaijan'],
			['name' => 'Bahamas', 'abv' => 'BS', 'abv3' => 'BHS', 'abv3_alt' => null, 'code' => 44, 'slug' => 'bahamas'],
			['name' => 'Bahrain', 'abv' => 'BH', 'abv3' => 'BHR', 'abv3_alt' => null, 'code' => 48, 'slug' => 'bahrain'],
			['name' => 'Bangladesh', 'abv' => 'BD', 'abv3' => 'BGD', 'abv3_alt' => null, 'code' => 50, 'slug' => 'bangladesh'],
			['name' => 'Barbados', 'abv' => 'BB', 'abv3' => 'BRB', 'abv3_alt' => null, 'code' => 52, 'slug' => 'barbados'],
			['name' => 'Belarus', 'abv' => 'BY', 'abv3' => 'BLR', 'abv3_alt' => null, 'code' => 112, 'slug' => 'belarus'],
			['name' => 'Belgium', 'abv' => 'BE', 'abv3' => 'BEL', 'abv3_alt' => null, 'code' => 56, 'slug' => 'belgium'],
			['name' => 'Belize', 'abv' => 'BZ', 'abv3' => 'BLZ', 'abv3_alt' => null, 'code' => 84, 'slug' => 'belize'],
			['name' => 'Benin', 'abv' => 'BJ', 'abv3' => 'BEN', 'abv3_alt' => null, 'code' => 204, 'slug' => 'benin'],
			['name' => 'Bermuda', 'abv' => 'BM', 'abv3' => 'BMU', 'abv3_alt' => null, 'code' => 60, 'slug' => 'bermuda'],
			['name' => 'Bhutan', 'abv' => 'BT', 'abv3' => 'BTN', 'abv3_alt' => null, 'code' => 64, 'slug' => 'bhutan'],
			['name' => 'Bolivia', 'abv' => 'BO', 'abv3' => 'BOL', 'abv3_alt' => null, 'code' => 68, 'slug' => 'bolivia'],
			['name' => 'Bosnia and Herzegovina', 'abv' => 'BA', 'abv3' => 'BIH', 'abv3_alt' => null, 'code' => 70, 'slug' => 'bosnia-and-herzegovina'],
			['name' => 'Botswana', 'abv' => 'BW', 'abv3' => 'BWA', 'abv3_alt' => null, 'code' => 72, 'slug' => 'botswana'],
			['name' => 'Brazil', 'abv' => 'BR', 'abv3' => 'BRA', 'abv3_alt' => null, 'code' => 76, 'slug' => 'brazil'],
			['name' => 'British Virgin Islands', 'abv' => 'VG', 'abv3' => 'VGB', 'abv3_alt' => null, 'code' => 92, 'slug' => 'british-virgin-islands'],
			['name' => 'Brunei Darussalam', 'abv' => 'BN', 'abv3' => 'BRN', 'abv3_alt' => null, 'code' => 96, 'slug' => 'brunei-darussalam'],
			['name' => 'Bulgaria', 'abv' => 'BG', 'abv3' => 'BGR', 'abv3_alt' => null, 'code' => 100, 'slug' => 'bulgaria'],
			['name' => 'Burkina Faso', 'abv' => 'BF', 'abv3' => 'BFA', 'abv3_alt' => null, 'code' => 854, 'slug' => 'burkina-faso'],
			['name' => 'Burundi', 'abv' => 'BI', 'abv3' => 'BDI', 'abv3_alt' => null, 'code' => 108, 'slug' => 'burundi'],
			['name' => 'Cambodia', 'abv' => 'KH', 'abv3' => 'KHM', 'abv3_alt' => null, 'code' => 116, 'slug' => 'cambodia'],
			['name' => 'Cameroon', 'abv' => 'CM', 'abv3' => 'CMR', 'abv3_alt' => null, 'code' => 120, 'slug' => 'cameroon'],
			['name' => 'Canada', 'abv' => 'CA', 'abv3' => 'CAN', 'abv3_alt' => null, 'code' => 124, 'slug' => 'canada'],
			['name' => 'Cape Verde', 'abv' => 'CV', 'abv3' => 'CPV', 'abv3_alt' => null, 'code' => 132, 'slug' => 'cape-verde'],
			['name' => 'Cayman Islands', 'abv' => 'KY', 'abv3' => 'CYM', 'abv3_alt' => null, 'code' => 136, 'slug' => 'cayman-islands'],
			['name' => 'Central African Republic', 'abv' => 'CF', 'abv3' => 'CAF', 'abv3_alt' => null, 'code' => 140, 'slug' => 'central-african-republic'],
			['name' => 'Chad', 'abv' => 'TD', 'abv3' => 'TCD', 'abv3_alt' => null, 'code' => 148, 'slug' => 'chad'],
			['name' => 'Chile', 'abv' => 'CL', 'abv3' => 'CHL', 'abv3_alt' => 'CHI', 'code' => 152, 'slug' => 'chile'],
			['name' => 'China', 'abv' => 'CN', 'abv3' => 'CHN', 'abv3_alt' => null, 'code' => 156, 'slug' => 'china'],
			['name' => 'Colombia', 'abv' => 'CO', 'abv3' => 'COL', 'abv3_alt' => null, 'code' => 170, 'slug' => 'colombia'],
			['name' => 'Comoros', 'abv' => 'KM', 'abv3' => 'COM', 'abv3_alt' => null, 'code' => 174, 'slug' => 'comoros'],
			['name' => 'Congo', 'abv' => 'CG', 'abv3' => 'COG', 'abv3_alt' => null, 'code' => 178, 'slug' => 'congo'],
			['name' => 'Cook Islands', 'abv' => 'CK', 'abv3' => 'COK', 'abv3_alt' => null, 'code' => 184, 'slug' => 'cook-islands'],
			['name' => 'Costa Rica', 'abv' => 'CR', 'abv3' => 'CRI', 'abv3_alt' => null, 'code' => 188, 'slug' => 'costa-rica'],
			['name' => 'Cote d\'Ivoire', 'abv' => 'CI', 'abv3' => 'CIV', 'abv3_alt' => null, 'code' => 384, 'slug' => 'cote-divoire'],
			['name' => 'Croatia', 'abv' => 'HR', 'abv3' => 'HRV', 'abv3_alt' => null, 'code' => 191, 'slug' => 'croatia'],
			['name' => 'Cuba', 'abv' => 'CU', 'abv3' => 'CUB', 'abv3_alt' => null, 'code' => 192, 'slug' => 'cuba'],
			['name' => 'Cyprus', 'abv' => 'CY', 'abv3' => 'CYP', 'abv3_alt' => null, 'code' => 196, 'slug' => 'cyprus'],
			['name' => 'Czech Republic', 'abv' => 'CZ', 'abv3' => 'CZE', 'abv3_alt' => null, 'code' => 203, 'slug' => 'czech-republic'],
			['name' => 'Democratic Republic of the Congo', 'abv' => 'CD', 'abv3' => 'COD', 'abv3_alt' => null, 'code' => 180, 'slug' => 'democratic-republic-of-congo'],
			['name' => 'Denmark', 'abv' => 'DK', 'abv3' => 'DNK', 'abv3_alt' => null, 'code' => 208, 'slug' => 'denmark'],
			['name' => 'Djibouti', 'abv' => 'DJ', 'abv3' => 'DJI', 'abv3_alt' => null, 'code' => 262, 'slug' => 'djibouti'],
			['name' => 'Dominica', 'abv' => 'DM', 'abv3' => 'DMA', 'abv3_alt' => null, 'code' => 212, 'slug' => 'dominica'],
			['name' => 'Dominican Republic', 'abv' => 'DO', 'abv3' => 'DOM', 'abv3_alt' => null, 'code' => 214, 'slug' => 'dominican-republic'],
			['name' => 'Ecuador', 'abv' => 'EC', 'abv3' => 'ECU', 'abv3_alt' => null, 'code' => 218, 'slug' => 'ecuador'],
			['name' => 'Egypt', 'abv' => 'EG', 'abv3' => 'EGY', 'abv3_alt' => null, 'code' => 818, 'slug' => 'egypt'],
			['name' => 'El Salvador', 'abv' => 'SV', 'abv3' => 'SLV', 'abv3_alt' => null, 'code' => 222, 'slug' => 'el-salvador'],
			['name' => 'Equatorial Guinea', 'abv' => 'GQ', 'abv3' => 'GNQ', 'abv3_alt' => null, 'code' => 226, 'slug' => 'equatorial-guinea'],
			['name' => 'Eritrea', 'abv' => 'ER', 'abv3' => 'ERI', 'abv3_alt' => null, 'code' => 232, 'slug' => 'eritrea'],
			['name' => 'Estonia', 'abv' => 'EE', 'abv3' => 'EST', 'abv3_alt' => null, 'code' => 233, 'slug' => 'estonia'],
			['name' => 'Ethiopia', 'abv' => 'ET', 'abv3' => 'ETH', 'abv3_alt' => null, 'code' => 231, 'slug' => 'ethiopia'],
			['name' => 'Faeroe Islands', 'abv' => 'FO', 'abv3' => 'FRO', 'abv3_alt' => null, 'code' => 234, 'slug' => 'faeroe-islands'],
			['name' => 'Falkland Islands', 'abv' => 'FK', 'abv3' => 'FLK', 'abv3_alt' => null, 'code' => 238, 'slug' => 'falkland-islands'],
			['name' => 'Fiji', 'abv' => 'FJ', 'abv3' => 'FJI', 'abv3_alt' => null, 'code' => 242, 'slug' => 'fiji'],
			['name' => 'Finland', 'abv' => 'FI', 'abv3' => 'FIN', 'abv3_alt' => null, 'code' => 246, 'slug' => 'finland'],
			['name' => 'France', 'abv' => 'FR', 'abv3' => 'FRA', 'abv3_alt' => null, 'code' => 250, 'slug' => 'france'],
			['name' => 'French Guiana', 'abv' => 'GF', 'abv3' => 'GUF', 'abv3_alt' => null, 'code' => 254, 'slug' => 'french-guiana'],
			['name' => 'French Polynesia', 'abv' => 'PF', 'abv3' => 'PYF', 'abv3_alt' => null, 'code' => 258, 'slug' => 'french-polynesia'],
			['name' => 'Gabon', 'abv' => 'GA', 'abv3' => 'GAB', 'abv3_alt' => null, 'code' => 266, 'slug' => 'gabon'],
			['name' => 'Gambia', 'abv' => 'GM', 'abv3' => 'GMB', 'abv3_alt' => null, 'code' => 270, 'slug' => 'gambia'],
			['name' => 'Georgia', 'abv' => 'GE', 'abv3' => 'GEO', 'abv3_alt' => null, 'code' => 268, 'slug' => 'georgia'],
			['name' => 'Germany', 'abv' => 'DE', 'abv3' => 'DEU', 'abv3_alt' => null, 'code' => 276, 'slug' => 'germany'],
			['name' => 'Ghana', 'abv' => 'GH', 'abv3' => 'GHA', 'abv3_alt' => null, 'code' => 288, 'slug' => 'ghana'],
			['name' => 'Gibraltar', 'abv' => 'GI', 'abv3' => 'GIB', 'abv3_alt' => null, 'code' => 292, 'slug' => 'gibraltar'],
			['name' => 'Greece', 'abv' => 'GR', 'abv3' => 'GRC', 'abv3_alt' => null, 'code' => 300, 'slug' => 'greece'],
			['name' => 'Greenland', 'abv' => 'GL', 'abv3' => 'GRL', 'abv3_alt' => null, 'code' => 304, 'slug' => 'greenland'],
			['name' => 'Grenada', 'abv' => 'GD', 'abv3' => 'GRD', 'abv3_alt' => null, 'code' => 308, 'slug' => 'grenada'],
			['name' => 'Guadeloupe', 'abv' => 'GP', 'abv3' => 'GLP', 'abv3_alt' => null, 'code' => 312, 'slug' => 'guadeloupe'],
			['name' => 'Guam', 'abv' => 'GU', 'abv3' => 'GUM', 'abv3_alt' => null, 'code' => 316, 'slug' => 'guam'],
			['name' => 'Guatemala', 'abv' => 'GT', 'abv3' => 'GTM', 'abv3_alt' => null, 'code' => 320, 'slug' => 'guatemala'],
			['name' => 'Guernsey', 'abv' => 'GG', 'abv3' => 'GGY', 'abv3_alt' => null, 'code' => 831, 'slug' => 'guernsey'],
			['name' => 'Guinea', 'abv' => 'GN', 'abv3' => 'GIN', 'abv3_alt' => null, 'code' => 324, 'slug' => 'guinea'],
			['name' => 'Guinea-Bissau', 'abv' => 'GW', 'abv3' => 'GNB', 'abv3_alt' => null, 'code' => 624, 'slug' => 'guinea-bissau'],
			['name' => 'Guyana', 'abv' => 'GY', 'abv3' => 'GUY', 'abv3_alt' => null, 'code' => 328, 'slug' => 'guyana'],
			['name' => 'Haiti', 'abv' => 'HT', 'abv3' => 'HTI', 'abv3_alt' => null, 'code' => 332, 'slug' => 'haiti'],
			['name' => 'Holy See', 'abv' => 'VA', 'abv3' => 'VAT', 'abv3_alt' => null, 'code' => 336, 'slug' => 'holy-see'],
			['name' => 'Honduras', 'abv' => 'HN', 'abv3' => 'HND', 'abv3_alt' => null, 'code' => 340, 'slug' => 'honduras'],
			['name' => 'Hong Kong', 'abv' => 'HK', 'abv3' => 'HKG', 'abv3_alt' => null, 'code' => 344, 'slug' => 'hong-kong'],
			['name' => 'Hungary', 'abv' => 'HU', 'abv3' => 'HUN', 'abv3_alt' => null, 'code' => 348, 'slug' => 'hungary'],
			['name' => 'Iceland', 'abv' => 'IS', 'abv3' => 'ISL', 'abv3_alt' => null, 'code' => 352, 'slug' => 'iceland'],
			['name' => 'India', 'abv' => 'IN', 'abv3' => 'IND', 'abv3_alt' => null, 'code' => 356, 'slug' => 'india'],
			['name' => 'Indonesia', 'abv' => 'ID', 'abv3' => 'IDN', 'abv3_alt' => null, 'code' => 360, 'slug' => 'indonesia'],
			['name' => 'Iran', 'abv' => 'IR', 'abv3' => 'IRN', 'abv3_alt' => null, 'code' => 364, 'slug' => 'iran'],
			['name' => 'Iraq', 'abv' => 'IQ', 'abv3' => 'IRQ', 'abv3_alt' => null, 'code' => 368, 'slug' => 'iraq'],
			['name' => 'Ireland', 'abv' => 'IE', 'abv3' => 'IRL', 'abv3_alt' => null, 'code' => 372, 'slug' => 'ireland'],
			['name' => 'Isle of Man', 'abv' => 'IM', 'abv3' => 'IMN', 'abv3_alt' => null, 'code' => 833, 'slug' => 'isle-of-man'],
			['name' => 'Israel', 'abv' => 'IL', 'abv3' => 'ISR', 'abv3_alt' => null, 'code' => 376, 'slug' => 'israel'],
			['name' => 'Italy', 'abv' => 'IT', 'abv3' => 'ITA', 'abv3_alt' => null, 'code' => 380, 'slug' => 'italy'],
			['name' => 'Jamaica', 'abv' => 'JM', 'abv3' => 'JAM', 'abv3_alt' => null, 'code' => 388, 'slug' => 'jamaica'],
			['name' => 'Japan', 'abv' => 'JP', 'abv3' => 'JPN', 'abv3_alt' => null, 'code' => 392, 'slug' => 'japan'],
			['name' => 'Jersey', 'abv' => 'JE', 'abv3' => 'JEY', 'abv3_alt' => null, 'code' => 832, 'slug' => 'jersey'],
			['name' => 'Jordan', 'abv' => 'JO', 'abv3' => 'JOR', 'abv3_alt' => null, 'code' => 400, 'slug' => 'jordan'],
			['name' => 'Kazakhstan', 'abv' => 'KZ', 'abv3' => 'KAZ', 'abv3_alt' => null, 'code' => 398, 'slug' => 'kazakhstan'],
			['name' => 'Kenya', 'abv' => 'KE', 'abv3' => 'KEN', 'abv3_alt' => null, 'code' => 404, 'slug' => 'kenya'],
			['name' => 'Kiribati', 'abv' => 'KI', 'abv3' => 'KIR', 'abv3_alt' => null, 'code' => 296, 'slug' => 'kiribati'],
			['name' => 'Kuwait', 'abv' => 'KW', 'abv3' => 'KWT', 'abv3_alt' => null, 'code' => 414, 'slug' => 'kuwait'],
			['name' => 'Kyrgyzstan', 'abv' => 'KG', 'abv3' => 'KGZ', 'abv3_alt' => null, 'code' => 417, 'slug' => 'kyrgyzstan'],
			['name' => 'Laos', 'abv' => 'LA', 'abv3' => 'LAO', 'abv3_alt' => null, 'code' => 418, 'slug' => 'laos'],
			['name' => 'Latvia', 'abv' => 'LV', 'abv3' => 'LVA', 'abv3_alt' => null, 'code' => 428, 'slug' => 'latvia'],
			['name' => 'Lebanon', 'abv' => 'LB', 'abv3' => 'LBN', 'abv3_alt' => null, 'code' => 422, 'slug' => 'lebanon'],
			['name' => 'Lesotho', 'abv' => 'LS', 'abv3' => 'LSO', 'abv3_alt' => null, 'code' => 426, 'slug' => 'lesotho'],
			['name' => 'Liberia', 'abv' => 'LR', 'abv3' => 'LBR', 'abv3_alt' => null, 'code' => 430, 'slug' => 'liberia'],
			['name' => 'Libyan Arab Jamahiriya', 'abv' => 'LY', 'abv3' => 'LBY', 'abv3_alt' => null, 'code' => 434, 'slug' => 'libyan-arab-jamahiriya'],
			['name' => 'Liechtenstein', 'abv' => 'LI', 'abv3' => 'LIE', 'abv3_alt' => null, 'code' => 438, 'slug' => 'liechtenstein'],
			['name' => 'Lithuania', 'abv' => 'LT', 'abv3' => 'LTU', 'abv3_alt' => null, 'code' => 440, 'slug' => 'lithuania'],
			['name' => 'Luxembourg', 'abv' => 'LU', 'abv3' => 'LUX', 'abv3_alt' => null, 'code' => 442, 'slug' => 'luxembourg'],
			['name' => 'Macao', 'abv' => 'MO', 'abv3' => 'MAC', 'abv3_alt' => null, 'code' => 446, 'slug' => 'macao'],
			['name' => 'Macedonia', 'abv' => 'MK', 'abv3' => 'MKD', 'abv3_alt' => null, 'code' => 807, 'slug' => 'macedonia'],
			['name' => 'Madagascar', 'abv' => 'MG', 'abv3' => 'MDG', 'abv3_alt' => null, 'code' => 450, 'slug' => 'madagascar'],
			['name' => 'Malawi', 'abv' => 'MW', 'abv3' => 'MWI', 'abv3_alt' => null, 'code' => 454, 'slug' => 'malawi'],
			['name' => 'Malaysia', 'abv' => 'MY', 'abv3' => 'MYS', 'abv3_alt' => null, 'code' => 458, 'slug' => 'malaysia'],
			['name' => 'Maldives', 'abv' => 'MV', 'abv3' => 'MDV', 'abv3_alt' => null, 'code' => 462, 'slug' => 'maldives'],
			['name' => 'Mali', 'abv' => 'ML', 'abv3' => 'MLI', 'abv3_alt' => null, 'code' => 466, 'slug' => 'mali'],
			['name' => 'Malta', 'abv' => 'MT', 'abv3' => 'MLT', 'abv3_alt' => null, 'code' => 470, 'slug' => 'malta'],
			['name' => 'Marshall Islands', 'abv' => 'MH', 'abv3' => 'MHL', 'abv3_alt' => null, 'code' => 584, 'slug' => 'marshall-islands'],
			['name' => 'Martinique', 'abv' => 'MQ', 'abv3' => 'MTQ', 'abv3_alt' => null, 'code' => 474, 'slug' => 'martinique'],
			['name' => 'Mauritania', 'abv' => 'MR', 'abv3' => 'MRT', 'abv3_alt' => null, 'code' => 478, 'slug' => 'mauritania'],
			['name' => 'Mauritius', 'abv' => 'MU', 'abv3' => 'MUS', 'abv3_alt' => null, 'code' => 480, 'slug' => 'mauritius'],
			['name' => 'Mayotte', 'abv' => 'YT', 'abv3' => 'MYT', 'abv3_alt' => null, 'code' => 175, 'slug' => 'mayotte'],
			['name' => 'Mexico', 'abv' => 'MX', 'abv3' => 'MEX', 'abv3_alt' => null, 'code' => 484, 'slug' => 'mexico'],
			['name' => 'Micronesia', 'abv' => 'FM', 'abv3' => 'FSM', 'abv3_alt' => null, 'code' => 583, 'slug' => 'micronesia'],
			['name' => 'Moldova', 'abv' => 'MD', 'abv3' => 'MDA', 'abv3_alt' => null, 'code' => 498, 'slug' => 'moldova'],
			['name' => 'Monaco', 'abv' => 'MC', 'abv3' => 'MCO', 'abv3_alt' => null, 'code' => 492, 'slug' => 'monaco'],
			['name' => 'Mongolia', 'abv' => 'MN', 'abv3' => 'MNG', 'abv3_alt' => null, 'code' => 496, 'slug' => 'mongolia'],
			['name' => 'Montenegro', 'abv' => 'ME', 'abv3' => 'MNE', 'abv3_alt' => null, 'code' => 499, 'slug' => 'montenegro'],
			['name' => 'Montserrat', 'abv' => 'MS', 'abv3' => 'MSR', 'abv3_alt' => null, 'code' => 500, 'slug' => 'montserrat'],
			['name' => 'Morocco', 'abv' => 'MA', 'abv3' => 'MAR', 'abv3_alt' => null, 'code' => 504, 'slug' => 'morocco'],
			['name' => 'Mozambique', 'abv' => 'MZ', 'abv3' => 'MOZ', 'abv3_alt' => null, 'code' => 508, 'slug' => 'mozambique'],
			['name' => 'Myanmar', 'abv' => 'MM', 'abv3' => 'MMR', 'abv3_alt' => 'BUR', 'code' => 104, 'slug' => 'myanmar'],
			['name' => 'Namibia', 'abv' => 'NA', 'abv3' => 'NAM', 'abv3_alt' => null, 'code' => 516, 'slug' => 'namibia'],
			['name' => 'Nauru', 'abv' => 'NR', 'abv3' => 'NRU', 'abv3_alt' => null, 'code' => 520, 'slug' => 'nauru'],
			['name' => 'Nepal', 'abv' => 'NP', 'abv3' => 'NPL', 'abv3_alt' => null, 'code' => 524, 'slug' => 'nepal'],
			['name' => 'Netherlands', 'abv' => 'NL', 'abv3' => 'NLD', 'abv3_alt' => null, 'code' => 528, 'slug' => 'netherlands'],
			['name' => 'Netherlands Antilles', 'abv' => 'AN', 'abv3' => 'ANT', 'abv3_alt' => null, 'code' => 530, 'slug' => 'netherlands-antilles'],
			['name' => 'New Caledonia', 'abv' => 'NC', 'abv3' => 'NCL', 'abv3_alt' => null, 'code' => 540, 'slug' => 'new-caledonia'],
			['name' => 'New Zealand', 'abv' => 'NZ', 'abv3' => 'NZL', 'abv3_alt' => null, 'code' => 554, 'slug' => 'new-zealand'],
			['name' => 'Nicaragua', 'abv' => 'NI', 'abv3' => 'NIC', 'abv3_alt' => null, 'code' => 558, 'slug' => 'nicaragua'],
			['name' => 'Niger', 'abv' => 'NE', 'abv3' => 'NER', 'abv3_alt' => null, 'code' => 562, 'slug' => 'niger'],
			['name' => 'Nigeria', 'abv' => 'NG', 'abv3' => 'NGA', 'abv3_alt' => null, 'code' => 566, 'slug' => 'nigeria'],
			['name' => 'Niue', 'abv' => 'NU', 'abv3' => 'NIU', 'abv3_alt' => null, 'code' => 570, 'slug' => 'niue'],
			['name' => 'Norfolk Island', 'abv' => 'NF', 'abv3' => 'NFK', 'abv3_alt' => null, 'code' => 574, 'slug' => 'norfolk-island'],
			['name' => 'North Korea', 'abv' => 'KP', 'abv3' => 'PRK', 'abv3_alt' => null, 'code' => 408, 'slug' => 'north-korea'],
			['name' => 'Northern Mariana Islands', 'abv' => 'MP', 'abv3' => 'MNP', 'abv3_alt' => null, 'code' => 580, 'slug' => 'northern-mariana-islands'],
			['name' => 'Norway', 'abv' => 'NO', 'abv3' => 'NOR', 'abv3_alt' => null, 'code' => 578, 'slug' => 'norway'],
			['name' => 'Oman', 'abv' => 'OM', 'abv3' => 'OMN', 'abv3_alt' => null, 'code' => 512, 'slug' => 'oman'],
			['name' => 'Pakistan', 'abv' => 'PK', 'abv3' => 'PAK', 'abv3_alt' => null, 'code' => 586, 'slug' => 'pakistan'],
			['name' => 'Palau', 'abv' => 'PW', 'abv3' => 'PLW', 'abv3_alt' => null, 'code' => 585, 'slug' => 'palau'],
			['name' => 'Palestine', 'abv' => 'PS', 'abv3' => 'PSE', 'abv3_alt' => null, 'code' => 275, 'slug' => 'palestine'],
			['name' => 'Panama', 'abv' => 'PA', 'abv3' => 'PAN', 'abv3_alt' => null, 'code' => 591, 'slug' => 'panama'],
			['name' => 'Papua New Guinea', 'abv' => 'PG', 'abv3' => 'PNG', 'abv3_alt' => null, 'code' => 598, 'slug' => 'papua-new-guinea'],
			['name' => 'Paraguay', 'abv' => 'PY', 'abv3' => 'PRY', 'abv3_alt' => null, 'code' => 600, 'slug' => 'paraguay'],
			['name' => 'Peru', 'abv' => 'PE', 'abv3' => 'PER', 'abv3_alt' => null, 'code' => 604, 'slug' => 'peru'],
			['name' => 'Philippines', 'abv' => 'PH', 'abv3' => 'PHL', 'abv3_alt' => null, 'code' => 608, 'slug' => 'philippines'],
			['name' => 'Pitcairn', 'abv' => 'PN', 'abv3' => 'PCN', 'abv3_alt' => null, 'code' => 612, 'slug' => 'pitcairn'],
			['name' => 'Poland', 'abv' => 'PL', 'abv3' => 'POL', 'abv3_alt' => null, 'code' => 616, 'slug' => 'poland'],
			['name' => 'Portugal', 'abv' => 'PT', 'abv3' => 'PRT', 'abv3_alt' => null, 'code' => 620, 'slug' => 'portugal'],
			['name' => 'Puerto Rico', 'abv' => 'PR', 'abv3' => 'PRI', 'abv3_alt' => null, 'code' => 630, 'slug' => 'puerto-rico'],
			['name' => 'Qatar', 'abv' => 'QA', 'abv3' => 'QAT', 'abv3_alt' => null, 'code' => 634, 'slug' => 'qatar'],
			['name' => 'Reunion', 'abv' => 'RE', 'abv3' => 'REU', 'abv3_alt' => null, 'code' => 638, 'slug' => 'reunion'],
			['name' => 'Romania', 'abv' => 'RO', 'abv3' => 'ROU', 'abv3_alt' => 'ROM', 'code' => 642, 'slug' => 'romania'],
			['name' => 'Russian Federation', 'abv' => 'RU', 'abv3' => 'RUS', 'abv3_alt' => null, 'code' => 643, 'slug' => 'russian-federation'],
			['name' => 'Rwanda', 'abv' => 'RW', 'abv3' => 'RWA', 'abv3_alt' => null, 'code' => 646, 'slug' => 'rwanda'],
			['name' => 'Saint Helena', 'abv' => 'SH', 'abv3' => 'SHN', 'abv3_alt' => null, 'code' => 654, 'slug' => 'saint-helena'],
			['name' => 'Saint Kitts and Nevis', 'abv' => 'KN', 'abv3' => 'KNA', 'abv3_alt' => null, 'code' => 659, 'slug' => 'saint-kitts-and-nevis'],
			['name' => 'Saint Lucia', 'abv' => 'LC', 'abv3' => 'LCA', 'abv3_alt' => null, 'code' => 662, 'slug' => 'saint-lucia'],
			['name' => 'Saint Pierre and Miquelon', 'abv' => 'PM', 'abv3' => 'SPM', 'abv3_alt' => null, 'code' => 666, 'slug' => 'saint-pierre-and-miquelon'],
			['name' => 'Saint Vincent and the Grenadines', 'abv' => 'VC', 'abv3' => 'VCT', 'abv3_alt' => null, 'code' => 670, 'slug' => 'saint-vincent-and-grenadines'],
			['name' => 'Saint-Barthelemy', 'abv' => 'BL', 'abv3' => 'BLM', 'abv3_alt' => null, 'code' => 652, 'slug' => 'saint-barthelemy'],
			['name' => 'Saint-Martin', 'abv' => 'MF', 'abv3' => 'MAF', 'abv3_alt' => null, 'code' => 663, 'slug' => 'saint-martin'],
			['name' => 'Samoa', 'abv' => 'WS', 'abv3' => 'WSM', 'abv3_alt' => null, 'code' => 882, 'slug' => 'samoa'],
			['name' => 'San Marino', 'abv' => 'SM', 'abv3' => 'SMR', 'abv3_alt' => null, 'code' => 674, 'slug' => 'san-marino'],
			['name' => 'Sao Tome and Principe', 'abv' => 'ST', 'abv3' => 'STP', 'abv3_alt' => null, 'code' => 678, 'slug' => 'sao-tome-and-principe'],
			['name' => 'Saudi Arabia', 'abv' => 'SA', 'abv3' => 'SAU', 'abv3_alt' => null, 'code' => 682, 'slug' => 'saudi-arabia'],
			['name' => 'Senegal', 'abv' => 'SN', 'abv3' => 'SEN', 'abv3_alt' => null, 'code' => 686, 'slug' => 'senegal'],
			['name' => 'Serbia', 'abv' => 'RS', 'abv3' => 'SRB', 'abv3_alt' => null, 'code' => 688, 'slug' => 'serbia'],
			['name' => 'Seychelles', 'abv' => 'SC', 'abv3' => 'SYC', 'abv3_alt' => null, 'code' => 690, 'slug' => 'seychelles'],
			['name' => 'Sierra Leone', 'abv' => 'SL', 'abv3' => 'SLE', 'abv3_alt' => null, 'code' => 694, 'slug' => 'sierra-leone'],
			['name' => 'Singapore', 'abv' => 'SG', 'abv3' => 'SGP', 'abv3_alt' => null, 'code' => 702, 'slug' => 'singapore'],
			['name' => 'Slovakia', 'abv' => 'SK', 'abv3' => 'SVK', 'abv3_alt' => null, 'code' => 703, 'slug' => 'slovakia'],
			['name' => 'Slovenia', 'abv' => 'SI', 'abv3' => 'SVN', 'abv3_alt' => null, 'code' => 705, 'slug' => 'slovenia'],
			['name' => 'Solomon Islands', 'abv' => 'SB', 'abv3' => 'SLB', 'abv3_alt' => null, 'code' => 90, 'slug' => 'solomon-islands'],
			['name' => 'Somalia', 'abv' => 'SO', 'abv3' => 'SOM', 'abv3_alt' => null, 'code' => 706, 'slug' => 'somalia'],
			['name' => 'South Africa', 'abv' => 'ZA', 'abv3' => 'ZAF', 'abv3_alt' => null, 'code' => 710, 'slug' => 'south-africa'],
			['name' => 'South Korea', 'abv' => 'KR', 'abv3' => 'KOR', 'abv3_alt' => null, 'code' => 410, 'slug' => 'south-korea'],
			['name' => 'South Sudan', 'abv' => 'SS', 'abv3' => 'SSD', 'abv3_alt' => null, 'code' => 728, 'slug' => 'south-sudan'],
			['name' => 'Spain', 'abv' => 'ES', 'abv3' => 'ESP', 'abv3_alt' => null, 'code' => 724, 'slug' => 'spain'],
			['name' => 'Sri Lanka', 'abv' => 'LK', 'abv3' => 'LKA', 'abv3_alt' => null, 'code' => 144, 'slug' => 'sri-lanka'],
			['name' => 'Sudan', 'abv' => 'SD', 'abv3' => 'SDN', 'abv3_alt' => null, 'code' => 729, 'slug' => 'sudan'],
			['name' => 'Suriname', 'abv' => 'SR', 'abv3' => 'SUR', 'abv3_alt' => null, 'code' => 740, 'slug' => 'suriname'],
			['name' => 'Svalbard and Jan Mayen Islands', 'abv' => 'SJ', 'abv3' => 'SJM', 'abv3_alt' => null, 'code' => 744, 'slug' => 'svalbard-and-jan-mayen-islands'],
			['name' => 'Swaziland', 'abv' => 'SZ', 'abv3' => 'SWZ', 'abv3_alt' => null, 'code' => 748, 'slug' => 'swaziland'],
			['name' => 'Sweden', 'abv' => 'SE', 'abv3' => 'SWE', 'abv3_alt' => null, 'code' => 752, 'slug' => 'sweden'],
			['name' => 'Switzerland', 'abv' => 'CH', 'abv3' => 'CHE', 'abv3_alt' => null, 'code' => 756, 'slug' => 'switzerland'],
			['name' => 'Syrian Arab Republic', 'abv' => 'SY', 'abv3' => 'SYR', 'abv3_alt' => null, 'code' => 760, 'slug' => 'syrian-arab-republic'],
			['name' => 'Tajikistan', 'abv' => 'TJ', 'abv3' => 'TJK', 'abv3_alt' => null, 'code' => 762, 'slug' => 'tajikistan'],
			['name' => 'Tanzania', 'abv' => 'TZ', 'abv3' => 'TZA', 'abv3_alt' => null, 'code' => 834, 'slug' => 'tanzania'],
			['name' => 'Thailand', 'abv' => 'TH', 'abv3' => 'THA', 'abv3_alt' => null, 'code' => 764, 'slug' => 'thailand'],
			['name' => 'Timor-Leste', 'abv' => 'TP', 'abv3' => 'TLS', 'abv3_alt' => null, 'code' => 626, 'slug' => 'timor-leste'],
			['name' => 'Togo', 'abv' => 'TG', 'abv3' => 'TGO', 'abv3_alt' => null, 'code' => 768, 'slug' => 'togo'],
			['name' => 'Tokelau', 'abv' => 'TK', 'abv3' => 'TKL', 'abv3_alt' => null, 'code' => 772, 'slug' => 'tokelau'],
			['name' => 'Tonga', 'abv' => 'TO', 'abv3' => 'TON', 'abv3_alt' => null, 'code' => 776, 'slug' => 'tonga'],
			['name' => 'Trinidad and Tobago', 'abv' => 'TT', 'abv3' => 'TTO', 'abv3_alt' => null, 'code' => 780, 'slug' => 'trinidad-and-tobago'],
			['name' => 'Tunisia', 'abv' => 'TN', 'abv3' => 'TUN', 'abv3_alt' => null, 'code' => 788, 'slug' => 'tunisia'],
			['name' => 'Turkey', 'abv' => 'TR', 'abv3' => 'TUR', 'abv3_alt' => null, 'code' => 792, 'slug' => 'turkey'],
			['name' => 'Turkmenistan', 'abv' => 'TM', 'abv3' => 'TKM', 'abv3_alt' => null, 'code' => 795, 'slug' => 'turkmenistan'],
			['name' => 'Turks and Caicos Islands', 'abv' => 'TC', 'abv3' => 'TCA', 'abv3_alt' => null, 'code' => 796, 'slug' => 'turks-and-caicos-islands'],
			['name' => 'Tuvalu', 'abv' => 'TV', 'abv3' => 'TUV', 'abv3_alt' => null, 'code' => 798, 'slug' => 'tuvalu'],
			['name' => 'U.S. Virgin Islands', 'abv' => 'VI', 'abv3' => 'VIR', 'abv3_alt' => null, 'code' => 850, 'slug' => 'us-virgin-islands'],
			['name' => 'Uganda', 'abv' => 'UG', 'abv3' => 'UGA', 'abv3_alt' => null, 'code' => 800, 'slug' => 'uganda'],
			['name' => 'Ukraine', 'abv' => 'UA', 'abv3' => 'UKR', 'abv3_alt' => null, 'code' => 804, 'slug' => 'ukraine'],
			['name' => 'United Arab Emirates', 'abv' => 'AE', 'abv3' => 'ARE', 'abv3_alt' => null, 'code' => 784, 'slug' => 'united-arab-emirates'],
			['name' => 'United Kingdom', 'abv' => 'UK', 'abv3' => 'GBR', 'abv3_alt' => null, 'code' => 826, 'slug' => 'united-kingdom'],
			['name' => 'United States', 'abv' => 'US', 'abv3' => 'USA', 'abv3_alt' => null, 'code' => 840, 'slug' => 'united-states'],
			['name' => 'Uruguay', 'abv' => 'UY', 'abv3' => 'URY', 'abv3_alt' => null, 'code' => 858, 'slug' => 'uruguay'],
			['name' => 'Uzbekistan', 'abv' => 'UZ', 'abv3' => 'UZB', 'abv3_alt' => null, 'code' => 860, 'slug' => 'uzbekistan'],
			['name' => 'Vanuatu', 'abv' => 'VU', 'abv3' => 'VUT', 'abv3_alt' => null, 'code' => 548, 'slug' => 'vanuatu'],
			['name' => 'Venezuela', 'abv' => 'VE', 'abv3' => 'VEN', 'abv3_alt' => null, 'code' => 862, 'slug' => 'venezuela'],
			['name' => 'Viet Nam', 'abv' => 'VN', 'abv3' => 'VNM', 'abv3_alt' => null, 'code' => 704, 'slug' => 'viet-nam'],
			['name' => 'Wallis and Futuna Islands', 'abv' => 'WF', 'abv3' => 'WLF', 'abv3_alt' => null, 'code' => 876, 'slug' => 'wallis-and-futuna-islands'],
			['name' => 'Western Sahara', 'abv' => 'EH', 'abv3' => 'ESH', 'abv3_alt' => null, 'code' => 732, 'slug' => 'western-sahara'],
			['name' => 'Yemen', 'abv' => 'YE', 'abv3' => 'YEM', 'abv3_alt' => null, 'code' => 887, 'slug' => 'yemen'],
			['name' => 'Zambia', 'abv' => 'ZM', 'abv3' => 'ZMB', 'abv3_alt' => null, 'code' => 894, 'slug' => 'zambia'],
			['name' => 'Zimbabwe', 'abv' => 'ZW', 'abv3' => 'ZWE', 'abv3_alt' => null, 'code' => 716, 'slug' => 'zimbabwe']
		]);
    }
}
