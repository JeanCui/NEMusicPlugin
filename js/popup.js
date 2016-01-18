/*
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

function set_i18n_text() {
    "use strict";
    var get_msg = chrome.i18n.getMessage;

    $('div#help_text').html(get_msg('help'));
    $('div#feedback').html(get_msg('feedback'));
}

$(document).ready(function() {
    "use strict";
    set_i18n_text();

    $('div#version small').html('Unblock NetEase Music v' + NEPlugin_Version);

});

