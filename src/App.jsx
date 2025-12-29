import React, { useState, useMemo, useEffect } from 'react';
import { 
  BookOpen, 
  ChevronRight, 
  Trophy, 
  Search, 
  Menu, 
  X, 
  GraduationCap, 
  Calendar, 
  Mic2, 
  Headphones,
  CheckCircle2,
  BrainCircuit,
  LayoutDashboard
} from 'lucide-react';

// --- Data Configuration ---

const COURSE_WEEKS = [
  { id: 1, title: "Berufliche Laufbahn", format: "Hot Seat", focus: "Der 4-monatige C1-Fluency Sprint" },
  { id: 2, title: "Deine Wohnsituation", format: "Hörverständnis", focus: "Die Wohnsituation und der Wohnort" },
  { id: 3, title: "Sozialleben & Lieblingsmenschen", format: "Hot Seat", focus: "Dein Sozialleben & Lieblingsmenschen" },
  { id: 4, title: "Technologie im Alltag", format: "Hörverständnis", focus: "Technologie im Alltag" },
  { id: 5, title: "Dafür brenne ich: Leidenschaften", format: "Hot Seat", focus: "Dafür brenne ich: Leidenschaften" },
  { id: 6, title: "Ein besonderes Reiseerlebnis", format: "Hörverständnis", focus: "Ein besonderes Reiseerlebnis" },
  { id: 7, title: "Wichtige Ereignisse in deiner Kultur", format: "Hot Seat", focus: "Wichtige Ereignisse in deiner Kultur" },
  { id: 8, title: "Lustige oder peinliche Anekdoten", format: "Hörverstehen", focus: "Lustige oder peinliche Anekdoten" },
  { id: 9, title: "Bücher und Filme empfehlen", format: "Hot Seat", focus: "Kulturelle Empfehlungen" },
  { id: 10, title: "Gesundheit und Lebensstil", format: "Hörverständnis", focus: "Gesundheit und Wohlbefinden" },
  { id: 11, title: "Gesellschaftliche/Politische Themen", format: "Hot Seat", focus: "Meinung und Debatte" },
  { id: 12, title: "Herausforderungen & Ärgernisse", format: "Hörverständnis", focus: "Resilienz im Alltag" },
  { id: 13, title: "Über deinen Lieblingsort sprechen", format: "Hot Seat", focus: "Persönliche Orte" },
  { id: 14, title: "Was nervt dich am meisten?", format: "Hörverstehen", focus: "Beschwerden und Kritik" },
  { id: 15, title: "Wofür bist du dankbar?", format: "Hot Seat", focus: "Dankbarkeit und Reflexion" },
  { id: 16, title: "Pläne für die Zukunft", format: "Hörverstehen", focus: "Vision und Ziele" },
];

const VOCAB_DATA = {
  1: [
    { id: 1, term: "der Werdegang", definition: "Die Gesamtheit der beruflichen Entwicklung und Stationen einer Person.", example: "Sein beruflicher Werdegang vom Praktikanten zum Geschäftsführer ist beeindruckend.", info: "Plural: die Werdegänge" },
    { id: 2, term: "die Führungsposition", definition: "Eine Position mit Personal- und Budgetverantwortung.", example: "Nach zehn Jahren im Unternehmen strebt sie nun eine Führungsposition an.", info: "Plural: die Führungspositionen" },
    { id: 3, term: "der Aufgabenbereich", definition: "Die Gesamtheit der Aufgaben und Verantwortlichkeiten einer Stelle.", example: "Mein Aufgabenbereich wurde kürzlich um das Projektmanagement erweitert.", info: "Plural: die Aufgabenbereiche" },
    { id: 4, term: "das Anforderungsprofil", definition: "Die Beschreibung der Anforderungen und Qualifikationen für eine Stelle.", example: "Ich entspreche dem Anforderungsprofil für diese Stelle nahezu perfekt.", info: "Plural: die Anforderungsprofile" },
    { id: 5, term: "die Aufstiegschance", definition: "Die Möglichkeiten, innerhalb eines Unternehmens in eine höhere Position aufzusteigen.", example: "In einem wachsenden Unternehmen sind die Aufstiegschancen oft besser.", info: "Plural: die Aufstiegschancen" },
    { id: 6, term: "die Weiterbildung", definition: "Maßnahmen zur Vertiefung oder Erweiterung der beruflichen Kenntnisse.", example: "Regelmäßige Weiterbildung ist entscheidend, um auf dem neuesten Stand zu bleiben.", info: "Plural: die Weiterbildungen" },
    { id: 7, term: "die Umschulung", definition: "Eine Ausbildung für einen neuen Beruf, oft nach längerer Pause oder in einem anderen Feld.", example: "Nach seiner Kündigung entschied er sich für eine Umschulung zum Informatiker.", info: "Plural: die Umschulungen" },
    { id: 8, term: "die Kernkompetenz", definition: "Die grundlegenden und wichtigsten Fähigkeiten in einem bestimmten Bereich.", example: "Die Entwicklung von Software ist die Kernkompetenz unserer Firma.", info: "Plural: die Kernkompetenzen" },
    { id: 9, term: "die Schlüsselqualifikation", definition: "Eine entscheidende Fähigkeit, die für den beruflichen Erfolg unerlässlich ist.", example: "Kommunikationsfähigkeit ist in fast jedem Beruf eine Schlüsselqualifikation.", info: "Plural: die Schlüsselqualifikationen" },
    { id: 10, term: "die Work-Life-Balance", definition: "Das Verhältnis zwischen Berufs- und Privatleben.", example: "Eine ausgewogene Work-Life-Balance ist wichtig, um einem Burnout vorzubeugen.", info: "Singular" },
    { id: 11, term: "das Burnout", definition: "Ein Zustand emotionaler, geistiger und körperlicher Erschöpfung durch beruflichen Stress.", example: "Die hohe Arbeitsbelastung führte bei ihm zu einem Burnout.", info: "Singular" },
    { id: 12, term: "die Sackgasse", definition: "Eine berufliche Tätigkeit, die keine Aufstiegs- oder Entwicklungsmöglichkeiten bietet.", example: "Er hatte das Gefühl, in einer beruflichen Sackgasse festzustecken, und kündigte.", info: "Plural: die Sackgassen" },
    { id: 13, term: "die berufliche Neuorientierung", definition: "Die Entscheidung, den bisherigen Beruf aufzugeben und eine neue berufliche Richtung einzuschlagen.", example: "Mit 40 Jahren wagte sie eine komplette berufliche Neuorientierung.", info: "Plural: die Neuorientierungen" },
    { id: 14, term: "die Arbeitszufriedenheit", definition: "Der Grad der Zufriedenheit einer Person mit ihrer Arbeit.", example: "Flexible Arbeitszeiten tragen maßgeblich zur Arbeitszufriedenheit bei.", info: "Singular" },
    { id: 15, term: "der/die Vorgesetzte", definition: "Der Vorgesetzte oder die vorgesetzte Person in einer Hierarchie.", example: "Das Gespräch mit meiner Vorgesetzten verlief sehr konstruktiv.", info: "Plural: die Vorgesetzten" },
    { id: 16, term: "der Stellenwechsel", definition: "Der Wechsel des Arbeitsplatzes zu einem neuen Arbeitgeber.", example: "Ein Stellenwechsel kann neue Perspektiven und ein höheres Gehalt mit sich bringen.", info: "Plural: die Stellenwechsel" },
    { id: 17, term: "der Ruhestand", definition: "Das Ende der Berufstätigkeit, meist im Alter.", example: "Nach 45 Arbeitsjahren freut er sich auf seinen wohlverdienten Ruhestand.", info: "Singular" },
    { id: 18, term: "das Gehaltspaket", definition: "Die Gesamtheit der finanziellen und nicht-finanziellen Leistungen eines Arbeitgebers.", example: "Das attraktive Gehaltspaket überzeugte ihn, das Angebot anzunehmen.", info: "Plural: die Gehaltspakete" },
    { id: 19, term: "das berufliche Netzwerk", definition: "Ein Netzwerk von beruflichen Kontakten.", example: "Auf Konferenzen kann man hervorragend sein berufliches Netzwerk pflegen.", info: "Plural: die Netzwerke" },
    { id: 20, term: "der Rückschlag", definition: "Ein unerwartetes, negatives Ereignis in der Karriere.", example: "Die Ablehnung des Projekts war ein herber Rückschlag für seine Karriere.", info: "Plural: die Rückschläge" },
    { id: 21, term: "der Mentor / die Mentorin", definition: "Eine Person, die ihr Wissen und ihre Erfahrung an eine weniger erfahrene Person weitergibt.", example: "Eine gute Mentorin kann die berufliche Entwicklung enorm beschleunigen.", info: "Plural: die Mentoren" },
    { id: 22, term: "der Ehrgeiz", definition: "Starke Motivation und der Wille, berufliche Ziele zu erreichen.", example: "Ihr Ehrgeiz ist die treibende Kraft hinter ihrem schnellen Aufstieg.", info: "Singular" },
    { id: 23, term: "die Arbeitsbelastung", definition: "Das Maß an Arbeit, das eine Person in einer bestimmten Zeit erledigen muss.", example: "Die ständige Erreichbarkeit erhöht die gefühlte Arbeitsbelastung.", info: "Singular" },
    { id: 24, term: "die Delegation", definition: "Die Übertragung von Aufgaben und Verantwortung an Mitarbeiter.", example: "Effektive Delegation ist ein Zeichen für gute Führungsqualitäten.", info: "Singular" },
    { id: 25, term: "die Arbeitsgenehmigung", definition: "Eine Arbeitserlaubnis für Ausländer.", example: "Um in der Schweiz zu arbeiten, benötigte er eine Arbeitsgenehmigung.", info: "Plural: die Arbeitsgenehmigungen" },
    { id: 26, term: "sich bewähren", definition: "Sich in einer neuen Rolle oder einem neuen Unternehmen bewähren und etablieren.", example: "In der Probezeit konnte er sich als kompetenter Mitarbeiter bewähren.", info: "Verb" },
    { id: 27, term: "eine Stelle antreten", definition: "Eine neue Arbeitsstelle beginnen.", example: "Sie wird die neue Stelle als Marketingleiterin am ersten des Monats antreten.", info: "Verb" },
    { id: 28, term: "etwas verantworten", definition: "Die Verantwortung für einen Bereich oder ein Projekt haben.", example: "In meiner Position verantworte ich das gesamte Marketingbudget.", info: "Verb" },
    { id: 29, term: "delegieren", definition: "Aufgaben an andere Personen (meist Mitarbeiter) übertragen.", example: "Ein guter Manager muss lernen, Aufgaben effektiv zu delegieren.", info: "Verb" },
    { id: 30, term: "befördert werden", definition: "In eine höhere Position aufsteigen.", example: "Nach nur zwei Jahren wurde sie zur Teamleiterin befördert.", info: "Passiv" },
    { id: 31, term: "sich spezialisieren auf", definition: "Sich auf ein bestimmtes Fachgebiet konzentrieren und darin Experte werden.", example: "Er hat sich auf internationales Steuerrecht spezialisiert.", info: "Verb" },
    { id: 32, term: "kündigen", definition: "Sein Arbeitsverhältnis von sich aus beenden.", example: "Er hat gekündigt, weil er ein besseres Angebot erhalten hat.", info: "Verb" },
    { id: 33, term: "Prioritäten setzen", definition: "Eine Aufgabe als wichtiger als andere einstufen und sie zuerst erledigen.", example: "Um die Arbeitsbelastung zu bewältigen, muss man lernen, Prioritäten zu setzen.", info: "Phrase" },
    { id: 34, term: "sich weiterbilden", definition: "Sich neue berufliche Fähigkeiten und Kenntnisse aneignen.", example: "Sie bildet sich regelmäßig in Abendkursen weiter.", info: "Verb" },
    { id: 35, term: "verhandeln", definition: "Über Gehälter, Verträge oder Bedingungen verhandeln.", example: "Vor der Vertragsunterzeichnung konnte ich ein höheres Gehalt verhandeln.", info: "Verb" },
    { id: 36, term: "in den Ruhestand gehen", definition: "Sich aus dem Berufsleben zurückziehen.", example: "Mein Vater plant, mit 65 Jahren in den Ruhestand zu gehen.", info: "Verb" },
    { id: 37, term: "eine Tätigkeit ausüben", definition: "Eine Tätigkeit beruflich ausführen.", example: "Sie übt ihre Tätigkeit als Ärztin mit großer Leidenschaft aus.", info: "Verb" },
    { id: 38, term: "seine Karriere vorantreiben", definition: "Seine Karriere gezielt vorantreiben.", example: "Durch strategische Weiterbildungen treibt sie ihre Karriere aktiv voran.", info: "Verb" },
    { id: 39, term: "jemanden einarbeiten", definition: "Jemanden in eine neue Aufgabe oder einen neuen Arbeitsbereich einführen.", example: "Es dauert etwa zwei Wochen, einen neuen Mitarbeiter gründlich einzuarbeiten.", info: "Verb" },
    { id: 40, term: "Erfahrungen sammeln", definition: "Berufliche Erfahrungen sammeln.", example: "Im Ausland konnte er wertvolle interkulturelle Erfahrungen sammeln.", info: "Verb" },
    { id: 41, term: "sich bewerben um", definition: "Sich für eine Stelle bewerben.", example: "Er bewirbt sich um eine Position im Vertrieb.", info: "Verb" },
    { id: 42, term: "sich beruflich neu orientieren", definition: "Sich beruflich in eine neue Richtung entwickeln.", example: "Viele Menschen orientieren sich in der Mitte ihres Lebens beruflich neu.", info: "Verb" },
    { id: 43, term: "netzwerken", definition: "Wichtige berufliche Kontakte knüpfen und pflegen.", example: "Es ist wichtig, auf Branchenveranstaltungen zu netzwerken.", info: "Verb" },
    { id: 44, term: "entlassen werden", definition: "Aus dem Arbeitsverhältnis entlassen werden.", example: "Aufgrund der Umstrukturierung wurden leider 50 Mitarbeiter entlassen.", info: "Passiv" },
    { id: 45, term: "eine Bilanz ziehen", definition: "Einen Überblick über die bisherige Karriere gewinnen und bewerten.", example: "Nach 20 Jahren im Beruf ist es Zeit, eine erste Bilanz zu ziehen.", info: "Phrase" },
    { id: 46, term: "ehrgeizig", definition: "Mit starkem Willen, ein Ziel zu erreichen.", example: "Sie ist eine sehr ehrgeizige Mitarbeiterin und will schnell aufsteigen.", info: "Adjektiv" },
    { id: 47, term: "zielstrebig", definition: "Klar auf ein Ziel ausgerichtet.", example: "Mit seiner zielstrebigen Art hat er das Projekt erfolgreich abgeschlossen.", info: "Adjektiv" },
    { id: 48, term: "belastbar", definition: "Fähig, hohem Druck und Stress standzuhalten.", example: "In der Eventbranche muss man extrem belastbar sein.", info: "Adjektiv" },
    { id: 49, term: "kompetent", definition: "Fähig und sachkundig.", example: "Wir suchen einen kompetenten Berater für unsere IT-Abteilung.", info: "Adjektiv" },
    { id: 50, term: "freiberuflich", definition: "Nicht für einen Arbeitgeber, sondern auf eigene Rechnung arbeitend.", example: "Als freiberufliche Grafikerin genießt sie ihre Unabhängigkeit.", info: "Adjektiv" },
    { id: 51, term: "angestellt", definition: "In einem festen Arbeitsverhältnis stehend.", example: "Nach Jahren der Freiberuflichkeit ist er nun fest angestellt.", info: "Adjektiv" },
    { id: 52, term: "unbefristet", definition: "Ohne zeitliche Begrenzung (Arbeitsvertrag).", example: "Sie hat nach der Probezeit einen unbefristeten Arbeitsvertrag erhalten.", info: "Adjektiv" },
    { id: 53, term: "verantwortungsvoll", definition: "Eine Tätigkeit betreffend, die viel Verantwortung mit sich bringt.", example: "Die Position des Fluglotsen ist äußerst verantwortungsvoll.", info: "Adjektiv" },
    { id: 54, term: "anspruchsvoll", definition: "Schwierig und fordernd.", example: "Ihre neue Aufgabe ist sehr anspruchsvoll, aber auch interessant.", info: "Adjektiv" },
    { id: 55, term: "gradlinig", definition: "Ohne Unterbrechungen oder große Wechsel verlaufend (Karriere).", example: "Sein Werdegang war sehr gradlinig: Schule, Studium, und dann immer dieselbe Firma.", info: "Adjektiv" },
    { id: 56, term: "abwechslungsreich", definition: "Vielseitig und mit unterschiedlichen Aufgaben.", example: "Ich schätze meine Arbeit, weil sie sehr abwechslungsreich ist.", info: "Adjektiv" },
    { id: 57, term: "interdisziplinär", definition: "Zwischen verschiedenen Fachbereichen.", example: "Unser Team arbeitet interdisziplinär, mit Experten aus IT, Marketing und Design.", info: "Adjektiv" },
    { id: 58, term: "beruflich", definition: "Die berufliche Entwicklung betreffend.", example: "Er möchte sich beruflich weiterentwickeln und sucht neue Herausforderungen.", info: "Adjektiv" },
    { id: 59, term: "qualifiziert", definition: "Wenn eine Person die nötigen Fähigkeiten für etwas besitzt.", example: "Sie ist für diese Führungsaufgabe bestens qualifiziert.", info: "Adjektiv" },
    { id: 60, term: "administrativ", definition: "Hauptsächlich im Büro stattfindend.", example: "Ein großer Teil ihrer Arbeit besteht aus administrativen Tätigkeiten.", info: "Adjektiv" },
    { id: 61, term: "temporär", definition: "Eine Arbeit, die man nur für eine bestimmte Zeit macht.", example: "Er wurde temporär für die Dauer des Projekts eingestellt.", info: "Adjektiv" },
    { id: 62, term: "führungsstark", definition: "Mit Führungskompetenz.", example: "Für diese Position suchen wir eine führungsstarke Persönlichkeit.", info: "Adjektiv" },
    { id: 63, term: "gewinnorientiert", definition: "Auf den Gewinn ausgerichtet.", example: "Als gewinnorientiertes Unternehmen müssen wir auf die Kosten achten.", info: "Adjektiv" },
    { id: 64, term: "teamfähig", definition: "Im Team gut zusammenarbeitend.", example: "In modernen Arbeitswelten ist es unerlässlich, teamfähig zu sein.", info: "Adjektiv" },
    { id: 65, term: "monoton", definition: "Langweilig und sich ständig wiederholend.", example: "Er empfand die Arbeit am Fließband als extrem monoton.", info: "Adjektiv" },
    { id: 66, term: "die Karriereleiter erklimmen", definition: "In der Hierarchie aufsteigen.", example: "Mit viel Einsatz und etwas Glück ist es ihm gelungen, die Karriereleiter zu erklimmen.", info: "Idiom" },
    { id: 67, term: "auf der Stelle treten", definition: "Sich nicht weiterentwickeln; stagnieren.", example: "Er hat das Gefühl, beruflich auf der Stelle zu treten und sucht nach neuen Impulsen.", info: "Idiom" },
    { id: 68, term: "sich ins Zeug legen", definition: "Sich sehr anstrengen, um etwas zu erreichen.", example: "Für die Beförderung hat sie sich in den letzten Monaten mächtig ins Zeug gelegt.", info: "Idiom" },
    { id: 69, term: "über den Tellerrand schauen", definition: "Neue, kreative oder unkonventionelle Ansätze in Betracht ziehen.", example: "Um innovativ zu sein, müssen wir über den Tellerrand schauen und von anderen Branchen lernen.", info: "Idiom" },
    { id: 70, term: "neue Wege einschlagen", definition: "Eine neue berufliche Richtung einschlagen.", example: "Nach dem Burnout beschloss sie, beruflich völlig neue Wege einzuschlagen und eröffnete ein Café.", info: "Idiom" }
  ],
  2: [
    { id: 71, term: "die Gentrifizierung", definition: "Der Prozess der Aufwertung eines Stadtviertels, der oft zur Verdrängung einkommensschwächerer Bewohner führt.", example: "Die Gentrifizierung des Viertels ist ein Paradebeispiel für die sozioökonomischen Verwerfungen in der Stadt.", info: "Singular" },
    { id: 72, term: "der Immobilienmarkt", definition: "Der Markt für Kauf- und Mietimmobilien.", example: "Die aktuelle Zinspolitik hat den Immobilienmarkt nachhaltig beeinflusst.", info: "Plural: die Immobilienmärkte" },
    { id: 73, term: "der Wohnraum", definition: "Der gesamte zur Verfügung stehende Platz zum Wohnen in einer Region.", example: "Die Verdichtung von Wohnraum ist eine stadtplanerische Herausforderung.", info: "Plural: die Wohnräume" },
    { id: 74, term: "die Wohnungsnot", definition: "Mangel an bezahlbaren Wohnungen.", example: "Politische Maßnahmen sind erforderlich, um der grassierenden Wohnungsnot entgegenzuwirken.", info: "Singular" },
    { id: 75, term: "die Siedlungsstruktur", definition: "Die Infrastruktur und sozialen Merkmale einer Siedlung oder Stadt.", example: "Die Siedlungsstruktur ist durch eine Mischung aus Altbauten und modernen Wohnkomplexen geprägt.", info: "Plural: die Siedlungsstrukturen" },
    { id: 76, term: "der Ballungsraum", definition: "Ein großes städtisches Gebiet, in dem mehrere Städte zusammengewachsen sind.", example: "Im Ballungsraum Rhein-Main ist die Nachfrage nach Wohnraum besonders hoch.", info: "Plural: die Ballungsräume" },
    { id: 77, term: "die Bausubstanz", definition: "Die Bausubstanz und der Zustand eines Gebäudes.", example: "Vor dem Kauf sollte ein Gutachter die Bausubstanz des Altbaus prüfen.", info: "Plural: die Bausubstanzen" },
    { id: 78, term: "der Wohnwert", definition: "Die Lebensqualität, die ein Ort bietet.", example: "Grünflächen und eine gute Verkehrsanbindung erhöhen den Wohnwert eines Stadtteils erheblich.", info: "Singular" },
    { id: 79, term: "die Metropole", definition: "Eine sehr große, bedeutende Stadt, die als Zentrum fungiert.", example: "In einer Metropole wie Tokio verschmelzen Tradition und Urbanität.", info: "Plural: die Metropolen" },
    { id: 80, term: "der Bebauungsplan", definition: "Ein offizielles Dokument, das die Bebauung eines Gebiets regelt.", example: "Der neue Bebauungsplan sieht eine höhere Wohndichte vor.", info: "Plural: die Bebauungspläne" },
    { id: 81, term: "der Denkmalschutz", definition: "Der Schutz von historischen Gebäuden vor Abriss oder Verunstaltung.", example: "Das Gebäude steht unter Denkmalschutz und darf nicht wesentlich verändert werden.", info: "Singular" },
    { id: 82, term: "die Bevölkerungsstruktur", definition: "Die sozioökonomische Zusammensetzung der Bewohner eines Gebiets.", example: "Die Bevölkerungsstruktur des Viertels hat sich in den letzten zehn Jahren stark verjüngt.", info: "Plural: die Bevölkerungsstrukturen" },
    { id: 83, term: "die Verdrängung", definition: "Der Vorgang, bei dem Menschen aus ihrem Lebensraum gedrängt werden.", example: "Luxussanierungen führen oft zur Verdrängung der langjährigen Mieterschaft.", info: "Singular" },
    { id: 84, term: "der Mietspiegel", definition: "Eine offizielle Übersicht über die ortsüblichen Vergleichsmieten.", example: "Eine Mieterhöhung ist nur zulässig, wenn sie sich im Rahmen des qualifizierten Mietspiegels bewegt.", info: "Plural: die Mietspiegel" },
    { id: 85, term: "das Sanierungsgebiet", definition: "Ein Gebiet mit besonderen städtebaulichen Problemen, das gefördert wird.", example: "Unser Viertel wurde zum Sanierungsgebiet erklärt, was Investitionen nach sich zog.", info: "Plural: die Sanierungsgebiete" },
    { id: 86, term: "die Kapitalanlage", definition: "Eine Immobilie, die als Geldanlage dient.", example: "Er kaufte die Wohnung nicht zur Eigennutzung, sondern als Kapitalanlage.", info: "Plural: die Kapitalanlagen" },
    { id: 87, term: "die Flächennutzung", definition: "Die Verteilung und Nutzung von Flächen in einem Gebiet.", example: "Die Debatte über die Flächennutzung zwischen Wohnungsbau und Gewerbe ist intensiv.", info: "Singular" },
    { id: 88, term: "die Lebensqualität", definition: "Die Gesamtheit der Faktoren, die die Qualität des Lebens beeinflussen.", example: "Die Lebensqualität wird nicht nur durch materielle, sondern auch durch soziale Faktoren bestimmt.", info: "Singular" },
    { id: 89, term: "die Segregation", definition: "Die räumliche Trennung von sozialen Gruppen in einer Stadt.", example: "Soziale Segregation ist ein Phänomen, das die soziale Ungleichheit in Städten verstärkt.", info: "Singular" },
    { id: 90, term: "die Umwandlung", definition: "Die Umwandlung von Miet- in Eigentumswohnungen.", example: "Die Umwandlung von Mietwohnungen hat den Druck auf den Mietmarkt weiter erhöht.", info: "Plural: die Umwandlungen" },
    { id: 91, term: "das Wohnungsbauprojekt", definition: "Ein Projekt zum Bau von Wohnungen.", example: "Das neue Wohnungsbauprojekt soll 500 neue Wohneinheiten schaffen.", info: "Plural: die Wohnungsbauprojekte" },
    { id: 92, term: "das Ambiente", definition: "Das Flair oder die besondere Ausstrahlung eines Ortes.", example: "Das historische Ambiente der Altstadt zieht viele Touristen an.", info: "Singular" },
    { id: 93, term: "das Quartier", definition: "Ein abgegrenzter Bereich einer Stadt mit einem bestimmten Charakter.", example: "Das Quartier hat sich von einem Arbeiterviertel zu einem Szeneviertel gewandelt.", info: "Plural: die Quartiere" },
    { id: 94, term: "der Ausstattungsstandard", definition: "Die Ausstattung und der Zustand einer Wohnung.", example: "Die Miete richtet sich nach Lage und Ausstattungsstandard der Immobilie.", info: "Plural: die Ausstattungsstandards" },
    { id: 95, term: "die Bevölkerungsdichte", definition: "Das Verhältnis der Einwohner zur Fläche.", example: "In der Innenstadt ist die Bevölkerungsdichte am höchsten.", info: "Singular" },
    { id: 96, term: "sanieren", definition: "Ein Gebäude grundlegend modernisieren und instand setzen.", example: "Der denkmalgeschützte Altbau wurde aufwendig saniert.", info: "Verb" },
    { id: 97, term: "verdrängen", definition: "Jemand aus seinem gewohnten Umfeld (z.B. Wohnung) drängen.", example: "Ökonomischer Druck verdrängt zunehmend die angestammte Bevölkerung.", info: "Verb" },
    { id: 98, term: "nachverdichten", definition: "Die Struktur eines Gebiets oder Gebäudes verändern, um es dichter zu bebauen.", example: "Um neuen Wohnraum zu schaffen, sollen bestehende Quartiere nachverdichtet werden.", info: "Verb" },
    { id: 99, term: "urbanisieren", definition: "Zunehmend städtische Merkmale annehmen.", example: "Ländliche Gebiete in der Nähe von Metropolen urbanisieren zusehends.", info: "Verb" },
    { id: 100, term: "sich etablieren", definition: "Sich an einem Ort dauerhaft niederlassen.", example: "Eine kreative Szene hat sich in diesem ehemaligen Industrieviertel etabliert.", info: "Verb" },
    { id: 101, term: "verkommen", definition: "Sich stark verschlechtern, an Wert verlieren.", example: "Ohne Investitionen drohen ganze Straßenzüge zu verkommen.", info: "Verb" },
    { id: 102, term: "sich herauskristallisieren", definition: "Sich über einen längeren Zeitraum entwickeln.", example: "Es kristallisiert sich heraus, dass die Nachfrage nach kleinen Wohnungen steigt.", info: "Verb" },
    { id: 103, term: "prägen", definition: "Den Charakter von etwas maßgeblich formen.", example: "Die Architektur des Bauhauses prägt bis heute das Stadtbild.", info: "Verb" },
    { id: 104, term: "begünstigen", definition: "Eine Entwicklung positiv beeinflussen.", example: "Die niedrigen Zinsen begünstigten den Boom auf dem Immobilienmarkt.", info: "Verb" },
    { id: 105, term: "beeinträchtigen", definition: "Eine Entwicklung negativ beeinflussen oder erschweren.", example: "Der ständige Fluglärm beeinträchtigt die Wohnqualität erheblich.", info: "Verb" },
    { id: 106, term: "abwägen", definition: "Die Vor- und Nachteile von etwas sorgfältig prüfen.", example: "Man muss abwägen, ob die Vorteile der zentralen Lage die höhere Miete rechtfertigen.", info: "Verb" },
    { id: 107, term: "indizieren", definition: "Auf etwas hindeuten, ein Anzeichen für etwas sein.", example: "Die hohe Fluktuation an Mietern indiziert eine geringe Wohnzufriedenheit.", info: "Verb" },
    { id: 108, term: "investieren (in)", definition: "Finanziell in etwas investieren.", example: "Die Stadt investiert massiv in die Verbesserung der lokalen Infrastruktur.", info: "Verb" },
    { id: 109, term: "revitalisieren", definition: "Etwas wiederbeleben oder neu beleben.", example: "Das Ziel ist, die alte Industriebrache zu revitalisieren und in ein Wohnquartier umzuwandeln.", info: "Verb" },
    { id: 110, term: "ansiedeln", definition: "Etwas Neues an einem Ort entstehen lassen.", example: "Man versucht, gezielt junge Technologie-Unternehmen in dem Viertel anzusiedeln.", info: "Verb" },
    { id: 111, term: "wuchern", definition: "Sich schnell und unkontrolliert ausbreiten (oft negativ).", example: "Die unregulierte Bebauung lässt die Ränder der Stadt unkontrolliert wuchern.", info: "Verb" },
    { id: 112, term: "hochschrauben", definition: "Etwas (z.B. Preise) künstlich in die Höhe treiben.", example: "Spekulanten schrauben die Immobilienpreise in unerschwingliche Höhen.", info: "Verb" },
    { id: 113, term: "deklarieren (als)", definition: "Etwas für einen bestimmten Zweck festlegen.", example: "Das gesamte Areal wurde als verkehrsberuhigte Zone deklariert.", info: "Verb" },
    { id: 114, term: "sich konzentrieren (auf)", definition: "Sich auf einen Ort konzentrieren.", example: "Der Wohnungsneubau konzentriert sich hauptsächlich auf die äußeren Stadtbezirke.", info: "Verb" },
    { id: 115, term: "entgegenwirken", definition: "Einen Trend oder eine Entwicklung umkehren.", example: "Die Stadt versucht, der zunehmenden Segregation mit sozialen Wohnprojekten entgegenzuwirken.", info: "Verb" },
    { id: 116, term: "urban", definition: "Die Stadt betreffend, städtisch.", example: "Das Konzept des \"urban gardening\" findet immer mehr Anhänger.", info: "Adjektiv" },
    { id: 117, term: "rural", definition: "Das Land betreffend, ländlich.", example: "In ruralen Gebieten ist die ärztliche Versorgung oft eine Herausforderung.", info: "Adjektiv" },
    { id: 118, term: "gehoben", definition: "Eine wohlhabende, gut situierte Klientel ansprechend.", example: "Die sanierten Altbauwohnungen richten sich an ein gehobenes Publikum.", info: "Adjektiv" },
    { id: 119, term: "hochwertig", definition: "Von hoher Qualität und Exklusivität.", example: "Die Wohnung zeichnet sich durch eine hochwertige Ausstattung aus.", info: "Adjektiv" },
    { id: 120, term: "marode", definition: "In schlechtem, vernachlässigtem Zustand.", example: "Die marode Bausubstanz erfordert eine umfassende Sanierung.", info: "Adjektiv" },
    { id: 121, term: "unerschwinglich", definition: "Für viele Menschen unbezahlbar.", example: "Wohnraum in den Metropolen ist für viele unerschwinglich geworden.", info: "Adjektiv" },
    { id: 122, term: "begehrt", definition: "Stark nachgefragt und begehrt.", example: "Wohnungen in Wassernähe sind besonders begehrt und entsprechend teuer.", info: "Adjektiv" },
    { id: 123, term: "dicht besiedelt", definition: "Dicht bebaut und bevölkert.", example: "Manhattan ist eine der am dichtesten besiedelten Gegenden der Welt.", info: "Adjektiv" },
    { id: 124, term: "weitläufig", definition: "Weitläufig und mit viel freier Fläche.", example: "Im Gegensatz zur Innenstadt ist die Bebauung am Stadtrand eher weitläufig.", info: "Adjektiv" },
    { id: 125, term: "räumlich", definition: "Den Raum betreffend; räumlich.", example: "Die räumliche Trennung von Arbeits- und Wohnort ist für viele Pendler Alltag.", info: "Adjektiv" },
    { id: 126, term: "demografisch", definition: "Die Demografie (Bevölkerungsentwicklung) betreffend.", example: "Der demografische Wandel beeinflusst den zukünftigen Bedarf an Wohnraum.", info: "Adjektiv" },
    { id: 127, term: "pulsierend", definition: "Voller Leben und Dynamik.", example: "Das pulsierende Nachtleben macht dieses Viertel besonders für junge Leute attraktiv.", info: "Adjektiv" },
    { id: 128, term: "beschaulich", definition: "Ruhig, friedlich und idyllisch.", example: "Er zog dem hektischen Stadtleben die beschauliche Ruhe eines Vorortes vor.", info: "Adjektiv" },
    { id: 129, term: "zweckgebunden", definition: "Für eine bestimmte Nutzung vorgesehen.", example: "Die Förderung ist zweckgebunden und darf nur für den sozialen Wohnungsbau verwendet werden.", info: "Adjektiv" },
    { id: 130, term: "strategisch", definition: "Von strategischer Bedeutung.", example: "Die Lage an der Autobahn ist für das Logistikunternehmen strategisch günstig.", info: "Adjektiv" },
    { id: 131, term: "rar", definition: "Nicht ausreichend vorhanden.", example: "Bezahlbare Vierzimmerwohnungen sind in dieser Stadt rar gesät.", info: "Adjektiv" },
    { id: 132, term: "multikulturell", definition: "Mit mehreren Kulturen.", example: "Das Viertel ist bekannt für seine multikulturelle Atmosphäre und kulinarische Vielfalt.", info: "Adjektiv" },
    { id: 133, term: "denkmalgeschützt", definition: "Den historischen Charakter bewahrend.", example: "Die Fassade des Hauses ist denkmalgeschützt.", info: "Adjektiv" },
    { id: 134, term: "zentral-ruhig", definition: "Im Zentrum gelegen, aber dennoch ruhig.", example: "Wir haben eine ideal gelegene, zentral-ruhige Wohnung gefunden.", info: "Adjektiv" },
    { id: 135, term: "barrierefrei", definition: "Ohne Barrieren, z.B. für Rollstuhlfahrer zugänglich.", example: "Der Neubau wurde komplett barrierefrei konzipiert.", info: "Adjektiv" },
    { id: 136, term: "Was den Reiz dieses Viertels ausmacht, ist...", definition: "Den wesentlichen Charakter eines Ortes zusammenfassen.", example: "Was den Reiz dieses Viertels ausmacht, ist die Symbiose aus historischer Architektur und modernem Lebensstil.", info: "Phrase" },
    { id: 137, term: "Ein kritisch zu beurteilender Aspekt ist...", definition: "Eine kritische Betrachtung einleiten.", example: "Ein kritisch zu beurteilender Aspekt ist die zunehmende Kommerzialisierung des öffentlichen Raums.", info: "Phrase" },
    { id: 138, term: "Es lässt sich eine Korrelation feststellen zwischen... und...", definition: "Eine komplexe Wechselwirkung beschreiben.", example: "Es lässt sich eine Korrelation feststellen zwischen der Aufwertung der Infrastruktur und den steigenden Mietpreisen.", info: "Phrase" },
    { id: 139, term: "Hier gilt es, einen Kompromiss zu finden zwischen...", definition: "Einen Kompromiss oder eine Abwägung formulieren.", example: "Hier gilt es, einen Kompromiss zu finden zwischen dem Bedarf an neuem Wohnraum und dem Erhalt von Grünflächen.", info: "Phrase" },
    { id: 140, term: "Die entscheidende Frage für die Zukunft wird sein, ob/wie...", definition: "Die zukünftige Entwicklung thematisieren.", example: "Die entscheidende Frage für die Zukunft wird sein, wie bezahlbarer Wohnraum für alle Bevölkerungsschichten gesichert werden kann.", info: "Phrase" }
  ],
  3: [
    { id: 141, term: "die Wertschätzung", definition: "Die Anerkennung des Wertes einer Person oder Beziehung.", example: "Gegenseitige Wertschätzung ist das Fundament einer jeden gesunden Beziehung.", info: "Singular" },
    { id: 142, term: "die Verbundenheit", definition: "Ein tiefes Gefühl der emotionalen Nähe und Zusammengehörigkeit.", example: "Trotz der räumlichen Distanz spüren wir eine tiefe Verbundenheit zueinander.", info: "Singular" },
    { id: 143, term: "die Empathie", definition: "Die Fähigkeit, die Gefühle einer anderen Person nachzuempfinden.", example: "Seine Empathie macht ihn zu einem außergewöhnlich guten Zuhörer.", info: "Singular" },
    { id: 144, term: "die Loyalität", definition: "Die Treue und Zuverlässigkeit gegenüber Freunden oder Prinzipien.", example: "In einer echten Freundschaft ist Loyalität eine unverzichtbare Eigenschaft.", info: "Singular" },
    { id: 145, term: "die Integrität", definition: "Die moralische Geradlinigkeit und Unbestechlichkeit einer Person.", example: "Ich schätze an ihm seine persönliche Integrität; er würde seine Werte niemals verraten.", info: "Singular" },
    { id: 146, term: "die Geborgenheit", definition: "Das Gefühl von Sicherheit, Wärme und Schutz in einer Beziehung.", example: "Die Familie gibt vielen Menschen ein Gefühl von Geborgenheit und Zugehörigkeit.", info: "Singular" },
    { id: 147, term: "der Konsens", definition: "Die gegenseitige Übereinstimmung von Meinungen oder Zielen.", example: "Nach langer Diskussion erzielten wir einen Konsens darüber, wie wir das Problem lösen.", info: "Singular" },
    { id: 148, term: "die Auseinandersetzung", definition: "Eine intensive, oft intellektuelle oder verbale Auseinandersetzung.", example: "Eine konstruktive Auseinandersetzung kann eine Beziehung sogar stärken.", info: "Plural: die Auseinandersetzungen" },
    { id: 149, term: "die Unstimmigkeit", definition: "Eine Meinungsverschiedenheit oder ein Konflikt.", example: "Wir hatten eine kleine Unstimmigkeit, die wir aber schnell klären konnten.", info: "Plural: die Unstimmigkeiten" },
    { id: 150, term: "die Entfremdung", definition: "Das Gefühl, sich von jemandem emotional entfernt zu haben.", example: "Mangelnde Kommunikation führte zur schleichenden Entfremdung der beiden Freunde.", info: "Singular" },
    { id: 151, term: "der Vertraute / die Vertraute", definition: "Eine Person, der man blind vertraut und alles erzählen kann.", example: "Sie ist nicht nur meine beste Freundin, sondern auch meine engste Vertraute.", info: "Plural: die Vertrauten" },
    { id: 152, term: "die Bezugsperson", definition: "Eine Person, die man bewundert und die als Vorbild dient.", example: "Mein älterer Bruder war in meiner Jugend meine wichtigste Bezugsperson.", info: "Plural: die Bezugspersonen" },
    { id: 153, term: "die Reziprozität", definition: "Das gegenseitige Geben und Nehmen in einer Beziehung.", example: "Die Freundschaft basiert auf Reziprozität und gegenseitiger Unterstützung.", info: "Singular" },
    { id: 154, term: "die Seelenverwandtschaft", definition: "Eine tiefe, oft spirituelle Übereinstimmung zwischen zwei Menschen.", example: "Zwischen ihnen herrscht eine Art Seelenverwandtschaft; sie verstehen sich ohne Worte.", info: "Singular" },
    { id: 155, term: "die Zuneigung", definition: "Ein starkes Gefühl emotionaler Zuneigung.", example: "Er zeigt seine Zuneigung nicht durch große Worte, sondern durch kleine Taten.", info: "Singular" },
    { id: 156, term: "die Missgunst", definition: "Das Gefühl, neidisch auf den Erfolg oder das Glück eines anderen zu sein.", example: "Missgunst kann eine Freundschaft auf Dauer vergiften.", info: "Singular" },
    { id: 157, term: "die Kompatibilität", definition: "Die Übereinstimmung von Charakteren, die ein harmonisches Miteinander ermöglicht.", example: "Ihre Kompatibilität zeigt sich in ihren gemeinsamen Werten und Interessen.", info: "Singular" },
    { id: 158, term: "das zwischenmenschliche Verhältnis", definition: "Die Gesamtheit der Beziehungen zwischen Menschen.", example: "In unserem Team legen wir großen Wert auf ein positives zwischenmenschliches Verhältnis.", info: "Plural: die zwischenmenschlichen Verhältnisse" },
    { id: 159, term: "die Gruppendynamik", definition: "Die Dynamik und die Prozesse innerhalb einer sozialen Gruppe.", example: "Die Gruppendynamik veränderte sich, als ein neues Mitglied hinzukam.", info: "Singular" },
    { id: 160, term: "das Mitgefühl", definition: "Das Gefühl tiefen Mitgefühls mit jemandem.", example: "Sie zeigte großes Mitgefühl für seine schwierige Situation.", info: "Singular" },
    { id: 161, term: "der Vertrauensbruch", definition: "Der Bruch des Vertrauens in einer Beziehung.", example: "Ein Vertrauensbruch ist nur schwer zu verzeihen.", info: "Plural: die Vertrauensbrüche" },
    { id: 162, term: "der Dissens", definition: "Eine Meinungsverschiedenheit, Uneinigkeit.", example: "In der Frage der Urlaubsplanung herrschte ein klarer Dissens.", info: "Singular" },
    { id: 163, term: "der Zusammenhalt", definition: "Das Zusammengehörigkeitsgefühl in einer Gruppe.", example: "Der starke Zusammenhalt in unserer Familie hat uns durch viele Krisen geholfen.", info: "Singular" },
    { id: 164, term: "das Charisma", definition: "Die Fähigkeit einer Person, andere zu faszinieren und zu führen.", example: "Mit seinem Charisma gewinnt er die Menschen mühelos für sich.", info: "Singular" },
    { id: 165, term: "das Urvertrauen", definition: "Das grundlegende Gefühl des Vertrauens, das in der Kindheit entwickelt wird.", example: "Ein stabiles Urvertrauen ist die Basis für gesunde Beziehungen im späteren Leben.", info: "Singular" },
    { id: 166, term: "jemanden prägen", definition: "Jemandes Charakter oder Entwicklung nachhaltig beeinflussen.", example: "Die Erfahrungen im Ausland haben mich als Mensch nachhaltig geprägt.", info: "Verb" },
    { id: 167, term: "nachvollziehen", definition: "Die Gedanken oder Gefühle einer anderen Person verstehen können.", example: "Ich kann deine Entscheidung zwar nicht gutheißen, aber ich kann sie nachvollziehen.", info: "Verb" },
    { id: 168, term: "sich anvertrauen", definition: "Jemandem Geheimnisse oder persönliche Gedanken mitteilen.", example: "Es braucht viel Mut, sich einem anderen Menschen vollständig anzuvertrauen.", info: "Verb" },
    { id: 169, term: "jemanden beistehen", definition: "Jemanden unterstützen und fördern.", example: "Wahre Freunde sind jene, die einem auch in den aussichtslosesten Situationen beistehen.", info: "Verb" },
    { id: 170, term: "sich entfremden", definition: "Sich emotional von jemandem entfernen.", example: "Über die Jahre haben sich die beiden Schulfreunde leider voneinander entfremdet.", info: "Verb" },
    { id: 171, term: "einen Konflikt beilegen", definition: "Einen Konflikt oder Streit durch ein Gespräch beenden.", example: "Wir sollten uns zusammensetzen und versuchen, unseren Konflikt beizulegen.", info: "Verb" },
    { id: 172, term: "eine Beziehung pflegen", definition: "Beziehungen aktiv gestalten und erhalten.", example: "Freundschaften sind wie Pflanzen; man muss sie regelmäßig pflegen, damit sie nicht eingehen.", info: "Verb" },
    { id: 173, term: "auf jemanden zählen", definition: "Sich auf jemanden voll und ganz verlassen.", example: "Ich weiß, dass ich in jeder Lebenslage auf meine Familie zählen kann.", info: "Verb" },
    { id: 174, term: "jemanden verehren", definition: "Sehr bewundern oder verehren.", example: "Ich verehre sie für ihren unermüdlichen Einsatz für Menschenrechte.", info: "Verb" },
    { id: 175, term: "jemanden inspirieren", definition: "Jemandem als positives Beispiel dienen.", example: "Ihre Lebensgeschichte hat mich dazu inspiriert, meine eigenen Träume zu verfolgen.", info: "Verb" },
    { id: 176, term: "nachempfinden", definition: "Die Gefühle einer anderen Person nachempfinden.", example: "Als kinderloser Mensch kann ich die Sorgen von Eltern nur schwer nachempfinden.", info: "Verb" },
    { id: 177, term: "vermitteln", definition: "Eine neutrale Position zwischen Streitenden einnehmen und helfen.", example: "Er versuchte, im Streit zwischen seinen beiden Freunden zu vermitteln.", info: "Verb" },
    { id: 178, term: "sich solidarisieren mit", definition: "Zu jemandem halten, besonders in schwierigen Zeiten.", example: "Als sie ungerecht behandelt wurde, solidarisierten sich alle Kollegen mit ihr.", info: "Verb" },
    { id: 179, term: "sich bewahrheiten", definition: "Sich als wahr oder echt herausstellen.", example: "Seine Befürchtung, dass der Freund nicht ehrlich war, hat sich leider bewahrheitet.", info: "Verb" },
    { id: 180, term: "aufrechterhalten", definition: "Eine Beziehung aufrechterhalten.", example: "Es ist schwierig, eine Freundschaft über eine große Distanz aufrechtzuerhalten.", info: "Verb" },
    { id: 181, term: "sich auseinandersetzen mit", definition: "Sich mit jemandem verbal oder intellektuell auseinandersetzen.", example: "Ich muss mich dringend mit ihm über sein Verhalten auseinandersetzen.", info: "Verb" },
    { id: 182, term: "verzeihen", definition: "Jemandem vergeben.", example: "Es fiel ihr schwer, ihm den Vertrauensbruch zu verzeihen.", info: "Verb" },
    { id: 183, term: "wertschätzen", definition: "Etwas oder jemanden als wertvoll ansehen.", example: "Ich habe gelernt, die ruhigen Momente mit meiner Familie besonders wertzuschätzen.", info: "Verb" },
    { id: 184, term: "aneinandergeraten", definition: "In Konflikt geraten.", example: "Wegen einer politischen Meinungsverschiedenheit sind die beiden aneinandergeraten.", info: "Verb" },
    { id: 185, term: "sich offenbaren", definition: "Jemandem gegenüber seine Gefühle oder Gedanken offenlegen.", example: "In einem langen Gespräch offenbarte er mir seine tiefsten Ängste.", info: "Verb" },
    { id: 186, term: "empathisch", definition: "Die Fähigkeit besitzend, sich in andere hineinzuversetzen.", example: "Ein empathischer Mensch spürt oft, wie es anderen geht, ohne dass sie es sagen müssen.", info: "Adjektiv" },
    { id: 187, term: "loyal", definition: "Treu und zuverlässig zu jemandem stehend.", example: "Trotz des öffentlichen Drucks blieb sie ihrem Freund gegenüber absolut loyal.", info: "Adjektiv" },
    { id: 188, term: "integer", definition: "Moralisch einwandfrei und ehrlich.", example: "Sie ist eine integre Persönlichkeit, die immer zu ihrem Wort steht.", info: "Adjektiv" },
    { id: 189, term: "selbstlos", definition: "Ohne eigene Interessen, auf das Wohl anderer bedacht.", example: "Ihre selbstlose Hilfe für die Gemeinschaft wird von allen bewundert.", info: "Adjektiv" },
    { id: 190, term: "aufrichtig", definition: "Ehrlich und unverfälscht in seinem Wesen.", example: "Ich schätze seine aufrichtige Art; er sagt immer, was er denkt.", info: "Adjektiv" },
    { id: 191, term: "nachtragend", definition: "Unfähig, Beleidigungen zu vergessen und zu vergeben.", example: "Er ist sehr nachtragend und spricht noch Jahre später über alte Kränkungen.", info: "Adjektiv" },
    { id: 192, term: "missgünstig", definition: "Neidisch auf den Erfolg oder Besitz anderer.", example: "Missgünstige Kommentare können die Freude am eigenen Erfolg trüben.", info: "Adjektiv" },
    { id: 193, term: "unnahbar", definition: "Emotional unzugänglich, distanziert.", example: "Auf den ersten Blick wirkt sie sehr unnahbar, aber eigentlich ist sie nur schüchtern.", info: "Adjektiv" },
    { id: 194, term: "bedingungslos", definition: "Ohne Bedingungen oder Einschränkungen.", example: "Die Liebe einer Mutter zu ihrem Kind ist oft bedingungslos.", info: "Adjektiv" },
    { id: 195, term: "innig", definition: "Sehr eng und vertraut (Beziehung).", example: "Sie pflegen eine sehr innige Freundschaft seit ihrer Kindheit.", info: "Adjektiv" },
    { id: 196, term: "oberflächlich", definition: "Nicht tiefgehend, nur an der Oberfläche bleibend.", example: "Ich meide oberflächliche Gespräche und suche den tiefgründigen Austausch.", info: "Adjektiv" },
    { id: 197, term: "unzertrennlich", definition: "Nicht trennbar, sehr eng verbunden.", example: "Seit sie sich im Studium kennengelernt haben, sind die beiden unzertrennlich.", info: "Adjektiv" },
    { id: 198, term: "gegenseitig", definition: "Sich gegenseitig betreffend oder erfolgend.", example: "Eine gute Beziehung basiert auf gegenseitigem Vertrauen und Respekt.", info: "Adjektiv" },
    { id: 199, term: "tiefgründig", definition: "Zum Nachdenken anregend, mit viel Substanz.", example: "Wir führten ein tiefgründiges Gespräch über den Sinn des Lebens.", info: "Adjektiv" },
    { id: 200, term: "souverän", definition: "Selbstsicher und überlegen im Auftreten.", example: "Sie meisterte die schwierige Situation souverän und mit bewundernswerter Ruhe.", info: "Adjektiv" },
    { id: 201, term: "gefestigt", definition: "Nicht zu erschüttern, emotional sehr stabil.", example: "Er ist eine in sich gefestigte Persönlichkeit, die sich nicht leicht aus der Ruhe bringen lässt.", info: "Adjektiv" },
    { id: 202, term: "harmoniebedürftig", definition: "Konflikte vermeidend, auf Ausgleich bedacht.", example: "Als sehr harmoniebedürftiger Mensch geht er Konfrontationen lieber aus dem Weg.", info: "Adjektiv" },
    { id: 203, term: "verletzend", definition: "Die Gefühle anderer verletzend.", example: "Seine unbedachten Worte waren zutiefst verletzend.", info: "Adjektiv" },
    { id: 204, term: "nachsichtig", definition: "Nachsichtig und verständnisvoll gegenüber den Fehlern anderer.", example: "Sie ist eine sehr nachsichtige Lehrerin, die jedem eine zweite Chance gibt.", info: "Adjektiv" },
    { id: 205, term: "authentisch", definition: "Frei von Falschheit, authentisch.", example: "Ich schätze Menschen, die authentisch sind und sich nicht verstellen.", info: "Adjektiv" },
    { id: 206, term: "auf einer Wellenlänge sein", definition: "Sich sehr gut und intuitiv verstehen.", example: "Wir haben sofort gemerkt, dass wir auf einer Wellenlänge sind und stundenlang geredet.", info: "Idiom" },
    { id: 207, term: "jemandem den Rücken stärken", definition: "Jemandem moralische und aktive Unterstützung geben.", example: "Als ich meine Firma gründete, hat meine Familie mir immer den Rücken gestärkt.", info: "Idiom" },
    { id: 208, term: "mit jemandem brechen", definition: "Eine Beziehung oder Freundschaft beenden.", example: "Nach dem heftigen Streit hat er endgültig mit seinem besten Freund gebrochen.", info: "Idiom" },
    { id: 209, term: "jemanden in- und auswendig kennen", definition: "Jemanden sehr gut und lange kennen.", example: "Nach zwanzig Jahren Freundschaft kenne ich sie in- und auswendig.", info: "Idiom" },
    { id: 210, term: "durch dick und dünn gehen", definition: "Gemeinsam alle Höhen und Tiefen des Lebens durchstehen.", example: "Echte Freunde sind diejenigen, die mit einem durch dick und dünn gehen.", info: "Idiom" }
  ],
  4: [
    { id: 211, term: "die Digitalisierung", definition: "Die tiefgreifende Umgestaltung von Gesellschaft und Wirtschaft durch digitale Technologien.", example: "Die Digitalisierung hat nahezu jeden Aspekt unseres Alltagslebens transformiert.", info: "Singular" },
    { id: 212, term: "die künstliche Intelligenz (KI)", definition: "Eine intelligente Maschine oder ein System, das menschenähnliche Denkprozesse simuliert.", example: "Künstliche Intelligenz wird bereits zur Optimierung von Verkehrsflüssen eingesetzt.", info: "Singular" },
    { id: 213, term: "der Algorithmus", definition: "Eine Reihe von Regeln oder Befehlen, die ein Computer zur Lösung eines Problems ausführt.", example: "Der Algorithmus der Social-Media-Plattform bestimmt, welche Inhalte uns angezeigt werden.", info: "Plural: die Algorithmen" },
    { id: 214, term: "der Datenschutz", definition: "Der Schutz persönlicher Daten vor Missbrauch.", example: "Bei der Nutzung von Apps ist ein kritischer Blick auf den Datenschutz unerlässlich.", info: "Singular" },
    { id: 215, term: "der digitale Fußabdruck", definition: "Die Gesamtheit der digitalen Spuren, die eine Person im Internet hinterlässt.", example: "Jeder Klick im Netz trägt zu unserem digitalen Fußabdruck bei.", info: "Plural: die digitalen Fußabdrücke" },
    { id: 216, term: "die digitale Kluft", definition: "Die Kluft zwischen Personen, die Zugang zu digitalen Technologien haben, und denen, die ihn nicht haben.", example: "Die digitale Kluft zwischen den Generationen zu überbrücken, ist eine wichtige gesellschaftliche Aufgabe.", info: "Singular" },
    { id: 217, term: "die Filterblase", definition: "Ein isolierter Informationsraum im Internet, in dem man nur noch Meinungen sieht, die der eigenen entsprechen.", example: "Die Filterblase kann zu einer verzerrten Wahrnehmung der Realität führen.", info: "Plural: die Filterblasen" },
    { id: 218, term: "die Medienkompetenz", definition: "Die Fähigkeit, digitale Medien kompetent und kritisch zu nutzen.", example: "In Zeiten von Fake News ist eine hohe Medienkompetenz von entscheidend Bedeutung.", info: "Singular" },
    { id: 219, term: "die Vernetzung", definition: "Die Verschmelzung von physischer und virtueller Welt durch Technologie.", example: "Die zunehmende Vernetzung von Alltagsgegenständen wird als 'Internet der Dinge' bezeichnet.", info: "Singular" },
    { id: 220, term: "der gläserne Mensch", definition: "Das Konzept, dass eine Person durch Datensammlung für Behörden und Konzerne völlig transparent wird.", example: "Die Debatte um den gläsernen Menschen thematisiert die Grenzen der Überwachung.", info: "Singular" },
    { id: 221, term: "die Automatisierung", definition: "Die Übertragung von Aufgaben von Menschen auf Maschinen.", example: "Die Automatisierung von Produktionsprozessen revolutioniert die Arbeitswelt.", info: "Singular" },
    { id: 222, term: "die Disruption", definition: "Der Prozess, bei dem eine neue Technologie bestehende Modelle radikal verändert oder ersetzt.", example: "Das Aufkommen von Streaming-Diensten war eine Disruption für die traditionelle Filmindustrie.", info: "Plural: die Disruptionen" },
    { id: 223, term: "die digitale Souveränität", definition: "Die Selbstbestimmung eines Individuums oder Staates über seine digitalen Daten und Systeme.", example: "Die Debatte um digitale Souveränität gewinnt in Europa an Bedeutung.", info: "Singular" },
    { id: 224, term: "die Cyber-Sicherheit", definition: "Der Schutz von Computersystemen und Netzwerken vor Diebstahl, Beschädigung oder unbefugtem Zugriff.", example: "Investitionen in die Cyber-Sicherheit sind für Unternehmen überlebenswichtig.", info: "Singular" },
    { id: 225, term: "die Schnittstelle", definition: "Ein Punkt, an dem zwei Systeme oder ein Mensch und ein System interagieren.", example: "Die Benutzeroberfläche ist die Schnittstelle zwischen dem Anwender und der Software.", info: "Plural: die Schnittstellen" },
    { id: 226, term: "die Verschlüsselung", definition: "Die mathematische Umwandlung von Daten, um sie unlesbar zu machen und zu schützen.", example: "Eine Ende-zu-Ende-Verschlüsselung bei Messengern schützt die Privatsphäre.", info: "Plural: die Verschlüsselungen" },
    { id: 227, term: "die Informationsflut", definition: "Die Menge an Informationen, die uns täglich zur Verfügung steht.", example: "Es erfordert Disziplin, in der heutigen Informationsflut nicht den Überblick zu verlieren.", info: "Singular" },
    { id: 228, term: "das Endgerät", definition: "Ein Gerät, das Eingaben empfängt (z.B. Smartphone, Laptop).", example: "Mobiles Arbeiten ist nur mit einem leistungsfähigen Endgerät möglich.", info: "Plural: die Endgeräte" },
    { id: 229, term: "das Smart Home", definition: "Die Gesamtheit der verbundenen Geräte im Haushalt.", example: "In einem Smart Home lassen sich Heizung und Licht per App steuern.", info: "Plural: die Smart Homes" },
    { id: 230, term: "die Cloud", definition: "Die Verlagerung von Daten und Diensten auf Server im Internet.", example: "Ich speichere meine Fotos in der Cloud, um von überall darauf zugreifen zu können.", info: "Plural: die Clouds" },
    { id: 231, term: "die ständige Erreichbarkeit", definition: "Die ständige Verfügbarkeit durch mobile Geräte.", example: "Die ständige Erreichbarkeit kann zu einer Entgrenzung von Arbeit und Privatleben führen.", info: "Singular" },
    { id: 232, term: "die Personalisierung", definition: "Die Anpassung von Inhalten oder Diensten an einen einzelnen Benutzer.", example: "Die Personalisierung von Werbung basiert auf der Analyse unseres Surfverhaltens.", info: "Singular" },
    { id: 233, term: "die Innovation", definition: "Ein technologischer Durchbruch oder eine wegweisende Neuerung.", example: "Die Entwicklung des mRNA-Impfstoffs war eine bahnbrechende medizinische Innovation.", info: "Plural: die Innovationen" },
    { id: 234, term: "die Überwachung", definition: "Die Überprüfung oder Kontrolle von Aktivitäten.", example: "Die zunehmende Videoüberwachung öffentlicher Plätze wird kontrovers diskutiert.", info: "Singular" },
    { id: 235, term: "der Wandel", definition: "Eine gesellschaftliche oder technologische Veränderung.", example: "Der digitale Wandel erfordert von uns allen eine hohe Anpassungsfähigkeit.", info: "Singular" },
    { id: 236, term: "digitalisieren", definition: "Etwas von analog auf digital umstellen.", example: "Viele Archive haben damit begonnen, ihre historischen Bestände zu digitalisieren.", info: "Verb" },
    { id: 237, term: "revolutionieren", definition: "Etwas grundlegend und nachhaltig verändern.", example: "Das Internet hat die Art und Weise, wie wir kommunizieren, revolutioniert.", info: "Verb" },
    { id: 238, term: "vernetzen", definition: "Systeme oder Geräte miteinander verbinden.", example: "In Zukunft werden noch mehr Geräte im Haushalt miteinander vernetzt sein.", info: "Verb" },
    { id: 239, term: "synchronisieren", definition: "Daten zwischen Geräten automatisch abgleichen.", example: "Ich synchronisiere meinen Kalender zwischen meinem Smartphone und meinem Laptop.", info: "Verb" },
    { id: 240, term: "sich authentifizieren", definition: "Die Echtheit einer Person oder eines Geräts überprüfen.", example: "Um mich einzuloggen, muss ich mich mit einem zweiten Faktor authentifizieren.", info: "Verb" },
    { id: 241, term: "verschlüsseln", definition: "Daten schützen, indem man sie in einen Code umwandelt.", example: "Sensible E-Mails sollten immer verschlüsselt werden.", info: "Verb" },
    { id: 242, term: "automatisieren", definition: "Prozesse so gestalten, dass sie ohne menschliches Eingreifen ablaufen.", example: "Wiederkehrende Aufgaben im Büroalltag lassen sich oft leicht automatisieren.", info: "Verb" },
    { id: 243, term: "personalisieren", definition: "Inhalte an die Vorlieben eines Nutzers anpassen.", example: "Nachrichten-Apps personalisieren den Newsfeed basierend auf den gelesenen Artikeln.", info: "Verb" },
    { id: 244, term: "optimieren", definition: "Die Effektivität von etwas verbessern.", example: "Die neue Software soll die internen Arbeitsabläufe optimieren.", info: "Verb" },
    { id: 245, term: "den Fortschritt hinterfragen", definition: "Den Fortschritt kritisch überdenken und bewerten.", example: "Es ist wichtig, den technologischen Fortschritt und seine sozialen Folgen kritisch zu hinterfragen.", info: "Verb" },
    { id: 246, term: "implementieren", definition: "Etwas in ein bestehendes System einfügen.", example: "Die Firma plant, ein neues System zur Datenanalyse zu implementieren.", info: "Verb" },
    { id: 247, term: "navigieren", definition: "Die Art und Weise, wie man mit einem System interagiert.", example: "Es dauert einen Moment, bis man lernt, in der komplexen Software zu navigieren.", info: "Verb" },
    { id: 248, term: "konfigurieren", definition: "Ein Gerät oder eine Software nach eigenen Wünschen einstellen.", example: "Ich habe mein neues Smartphone nach meinen persönlichen Bedürfnissen konfiguriert.", info: "Verb" },
    { id: 249, term: "in etwas eintauchen", definition: "Sich in eine virtuelle Welt hineinversetzen.", example: "Mit einer VR-Brille kann man vollständig in virtuelle Welten eintauchen.", info: "Verb" },
    { id: 250, term: "potenzieren", definition: "Eine Entwicklung oder einen Zustand verstärken.", example: "Algorithmen können bestehende Vorurteile nicht nur reproduzieren, sondern sogar potenzieren.", info: "Verb" },
    { id: 251, term: "entgrenzen", definition: "Die Grenzen zwischen Bereichen (z.B. Arbeit/Freizeit) auflösen.", example: "Mobiles Arbeiten hat die Tendenz, die Sphären von Beruf und Privatleben zu entgrenzen.", info: "Verb" },
    { id: 252, term: "regulieren", definition: "Etwas steuern oder gesetzlich festlegen.", example: "Es wird diskutiert, wie der Einsatz von künstlicher Intelligenz stärker reguliert werden kann.", info: "Verb" },
    { id: 253, term: "überwachen", definition: "Etwas oder jemanden unter Beobachtung halten.", example: "Smarte Assistenten überwachen permanent ihre Umgebung auf ein Aktivierungswort.", info: "Verb" },
    { id: 254, term: "durchdringen", definition: "Etwas durchdringen und überall präsent sein.", example: "Digitale Technologie durchdringt mittlerweile alle Bereiche unseres Lebens.", info: "Verb" },
    { id: 255, term: "neu bewerten", definition: "Den Wert von etwas neu bewerten.", example: "Die Pandemie hat uns gezwungen, den Wert persönlicher Interaktion neu zu bewerten.", info: "Verb" },
    { id: 256, term: "allgegenwärtig", definition: "Überall und zu jeder Zeit vorhanden.", example: "Smartphones sind zu einem allgegenwärtigen Begleiter in unserem Alltag geworden.", info: "Adjektiv" },
    { id: 257, term: "unumgänglich", definition: "Nicht zu vermeiden oder zu umgehen.", example: "Eine grundlegende digitale Kompetenz ist für die meisten Berufe unumgänglich.", info: "Adjektiv" },
    { id: 258, term: "immersiv", definition: "Völlig in eine virtuelle Umgebung eintauchend.", example: "Immersive Technologien wie VR schaffen ein Gefühl des vollständigen Eintauchens.", info: "Adjektiv" },
    { id: 259, term: "intuitiv", definition: "Leicht und ohne Erklärung verständlich.", example: "Die Benutzeroberfläche der App ist so intuitiv, dass man keine Anleitung benötigt.", info: "Adjektiv" },
    { id: 260, term: "obsolet", definition: "Veraltet und durch neuere Technologie überholt.", example: "CDs sind als primäres Musikmedium mittlerweile weitgehend obsolet.", info: "Adjektiv" },
    { id: 261, term: "anfällig", definition: "Für Angriffe oder Störungen empfänglich.", example: "Das System ist bekannt dafür, anfällig für Cyber-Angriffe zu sein.", info: "Adjektiv" },
    { id: 262, term: "nahtlos", definition: "Ohne Unterbrechung und nahtlos.", example: "Der Übergang vom mobilen Netz ins WLAN sollte nahtlos funktionieren.", info: "Adjektiv" },
    { id: 263, term: "transparent", definition: "Offen und nachvollziehbar.", example: "Nutzer fordern, dass die Algorithmen der Plattformen transparenter gemacht werden.", info: "Adjektiv" },
    { id: 264, term: "disruptiv", definition: "Eine grundlegende Veränderung bewirkend.", example: "Die disruptive Kraft des Internets hat ganze Branchen umgekrempelt.", info: "Adjektiv" },
    { id: 265, term: "zukunftsweisend", definition: "Wegweisend für die Zukunft.", example: "Das Konzept des autonomen Fahrens gilt als zukunftsweisende Technologie.", info: "Adjektiv" },
    { id: 266, term: "gesellschaftsverändernd", definition: "Die Gesellschaft nachhaltig verändernd.", example: "Die Erfindung des Buchdrucks hatte eine tiefgreifende gesellschaftsverändernde Wirkung.", info: "Adjektiv" },
    { id: 267, term: "virtuell", definition: "Ohne physische Existenz, nur im Computer erzeugt.", example: "Viele Konferenzen finden mittlerweile in einem virtuellen Raum statt.", info: "Adjektiv" },
    { id: 268, term: "interaktiv", definition: "Wechselseitig, aufeinander reagierend.", example: "Moderne Lernplattformen bieten viele interaktive Übungen an.", info: "Adjektiv" },
    { id: 269, term: "datenschutzrechtlich bedenklich", definition: "Für den Datenschutz relevant und wichtig.", example: "Die Sammlung großer Datenmengen durch die App ist datenschutzrechtlich bedenklich.", info: "Adjektiv" },
    { id: 270, term: "personalisiert", definition: "Auf einen speziellen Nutzer zugeschnitten.", example: "Ich erhalte personalisierte Buchempfehlungen basierend auf meinen bisherigen Käufen.", info: "Adjektiv" },
    { id: 271, term: "autonom", definition: "Selbstständig handelnd, ohne menschliche Steuerung.", example: "Die Entwicklung autonomer Fahrzeuge schreitet schnell voran.", info: "Adjektiv" },
    { id: 272, term: "adaptiv", definition: "In der Lage, zu lernen und sich anzupassen.", example: "Adaptive Lernsysteme passen den Schwierigkeitsgrad der individuell an.", info: "Adjektiv" },
    { id: 273, term: "entgrenzend", definition: "Die Grenzen zwischen verschiedenen Bereichen auflösend.", example: "Die ständige Erreichbarkeit wirkt für viele Menschen entgrenzend auf ihr Privatleben.", info: "Adjektiv" },
    { id: 274, term: "sicherheitsrelevant", definition: "Für die Sicherheit eines Systems entscheidend.", example: "Software-Updates enthalten oft Korrekturen für sicherheitsrelevante Schwachstellen.", info: "Adjektiv" },
    { id: 275, term: "hochmodern", definition: "Auf dem neuesten Stand der Technik.", example: "Das neue Rechenzentrum ist mit hochmoderner Servertechnologie ausgestattet.", info: "Adjektiv" },
    { id: 276, term: "Segen und Fluch zugleich sein", definition: "Sowohl große Vorteile als auch große Nachteile haben.", example: "Die ständige Konnektivität kann Segen und Fluch zugleich sein.", info: "Idiom" },
    { id: 277, term: "nicht mehr wegzudenken sein", definition: "Aus dem täglichen Leben nicht mehr entfernbar sein.", example: "Das Smartphone ist aus dem modernen Alltag nicht mehr wegzudenken.", info: "Idiom" },
    { id: 278, term: "die Kehrseite der Medaille", definition: "Die negative, oft verborgene Seite einer ansonsten positiven Sache.", example: "Die Kehrseite der Medaille bei der Automatisierung ist der potenzielle Verlust von Arbeitsplätzen.", info: "Idiom" },
    { id: 279, term: "einen kritischen Umgang pflegen", definition: "Einen bewussten und kritischen Umgang mit etwas praktizieren.", example: "Es ist essenziell, einen kritischen Umgang mit den Informationen zu pflegen, die man online findet.", info: "Idiom" },
    { id: 280, term: "einen Paradigmenwechsel einleiten", definition: "Eine grundlegende und weitreichende Veränderung in der Denk- oder Vorgehensweise.", example: "Die Entwicklung der KI leitet einen Paradigmenwechsel in vielen wissenschaftlichen Disziplinen ein.", info: "Idiom" }
  ],
  5: [
    { id: 281, term: "die Hingabe", definition: "Die intensive, fast aufopferungsvolle Beschäftigung mit einer Sache.", example: "Sie widmet sich der Malerei mit einer beeindruckenden Hingabe.", info: "Singular" },
    { id: 282, term: "die Erfüllung", definition: "Der Zustand, in dem eine Tätigkeit vollkommenes Glück und Zufriedenheit bereitet.", example: "In der Musik hat sie ihre wahre Erfüllung gefunden.", info: "Singular" },
    { id: 283, term: "die Gabe", definition: "Eine besondere Begabung oder ein angeborenes Talent.", example: "Er hat die seltene Gabe, komplexe Sachverhalte einfach zu erklären.", info: "Plural: die Gaben" },
    { id: 284, term: "die Motivation", definition: "Der innere Antrieb, etwas zu tun oder zu erreichen.", example: "Meine Motivation für den Sport ist der Ausgleich zum stressigen Alltag.", info: "Singular" },
    { id: 285, term: "die Berufung", definition: "Die Berufung oder das Gefühl, für eine bestimmte Aufgabe bestimmt zu sein.", example: "Für sie ist das Unterrichten nicht nur ein Job, sondern eine echte Berufung.", info: "Plural: die Berufungen" },
    { id: 286, term: "der Flow", definition: "Ein tiefer, fast spiritueller Zustand der Konzentration, bei dem man Zeit und Raum vergisst.", example: "Wenn ich schreibe, komme ich oft in einen Flow-Zustand.", info: "Singular" },
    { id: 287, term: "die Affinität", definition: "Eine persönliche Vorliebe oder Neigung zu etwas.", example: "Schon als Kind hatte er eine starke Affinität zu Zahlen und Logik.", info: "Plural: die Affinitäten" },
    { id: 288, term: "die Manie", definition: "Eine starke Faszination oder ein obsessives Interesse.", example: "Seine Sammelleidenschaft grenzt schon fast an eine Manie.", info: "Plural: die Manien" },
    { id: 289, term: "das Steckenpferd", definition: "Ein Lieblingshobby, dem man sich besonders intensiv widmet.", example: "Die Ahnenforschung ist seit Jahren ihr liebstes Steckenpferd.", info: "Plural: die Steckenpferde" },
    { id: 290, term: "die Liebhaberei", definition: "Eine Betätigung, die man mit großer Liebe und Sorgfalt ausübt.", example: "Er betreibt seine Oldtimer-Werkstatt nicht kommerziell, sondern als reine Liebhaberei.", info: "Plural: die Liebhabereien" },
    { id: 291, term: "die Vertiefung", definition: "Die intensive geistige Auseinandersetzung mit einem Thema.", example: "Die Vertiefung in die Geschichte des Mittelalters fasziniert mich ungemein.", info: "Singular" },
    { id: 292, term: "der Schaffensdrang", definition: "Der innere Wunsch, kreativ zu sein und etwas zu schaffen.", example: "In Phasen großen Schaffensdrangs kann sie nächtelang durcharbeiten.", info: "Singular" },
    { id: 293, term: "die Kreativität", definition: "Die Fähigkeit, etwas Neues und Originelles zu erschaffen.", example: "Beim Improvisationstheater kann man seiner Kreativität freien Lauf lassen.", info: "Singular" },
    { id: 294, term: "die Euphorie", definition: "Ein tiefes Gefühl der Begeisterung und des Enthusiasmus.", example: "Nach dem gewonnenen Wettkampf war das ganze Team in einem Zustand der Euphorie.", info: "Singular" },
    { id: 295, term: "die Selbstverwirklichung", definition: "Die Entfaltung der eigenen Persönlichkeit und Potenziale.", example: "Für viele ist eine leidenschaftliche Tätigkeit ein Weg zur Selbstverwirklichung.", info: "Singular" },
    { id: 296, term: "das Ausgleichsbedürfnis", definition: "Das Verlangen nach Abwechslung und Ausgleich zum Alltag.", example: "Mein starkes Ausgleichsbedürfnis befriedige ich durch regelmäßiges Wandern in der Natur.", info: "Singular" },
    { id: 297, term: "der Connaisseur", definition: "Ein Experte oder leidenschaftlicher Kenner auf einem Gebiet.", example: "Als Wein-Connaisseur kann er feinste geschmackliche Nuancen unterscheiden.", info: "Plural: die Connaisseure" },
    { id: 298, term: "das Ventil", definition: "Ein Ventil, um aufgestaute Emotionen oder Stress abzubauen.", example: "Sport ist für mich das perfekte Ventil, um den Kopf freizubekommen.", info: "Plural: die Ventile" },
    { id: 299, term: "die Kraftquelle", definition: "Die Kraftquelle, aus der man Energie schöpft.", example: "Der Garten ist für sie eine unerschöpfliche Kraftquelle.", info: "Plural: die Kraftquellen" },
    { id: 300, term: "die Passion", definition: "Die unbändige Freude an einer Tätigkeit.", example: "Kochen ist für ihn mehr als ein Hobby, es ist seine wahre Passion.", info: "Singular" },
    { id: 301, term: "der Impuls", definition: "Die Inspiration oder der Anstoß, etwas zu tun.", example: "Der Besuch eines Konzerts gab mir den Impuls, selbst ein Instrument zu lernen.", info: "Plural: die Impulse" },
    { id: 302, term: "die Ausdauer", definition: "Die Fähigkeit, lange und konzentriert bei einer Sache zu bleiben.", example: "Marathonlaufen erfordert nicht nur körperliche Fitness, sondern auch mentale Ausdauer.", info: "Singular" },
    { id: 303, term: "die Meisterschaft", definition: "Ein hohes Maß an Können und Wissen auf einem Gebiet.", example: "Nach Jahren des Übens hat er in seinem Handwerk wahre Meisterschaft erlangt.", info: "Singular" },
    { id: 304, term: "die Entspannung", definition: "Die Entspannung von Körper und Geist.", example: "Nach einer intensiven Arbeitswoche suche ich in der Natur aktive Entspannung.", info: "Singular" },
    { id: 305, term: "der Enthusiasmus", definition: "Die Begeisterung für etwas.", example: "Ihr Enthusiasmus für das Projekt ist ansteckend.", info: "Singular" },
    { id: 306, term: "in etwas aufgehen", definition: "Sich vollkommen in eine Tätigkeit vertiefen und alles andere vergessen.", example: "Wenn sie malt, geht sie vollkommen in ihrer Tätigkeit auf.", info: "Verb" },
    { id: 307, term: "sich einer Sache verschreiben", definition: "Sich mit großer Hingabe und Zeit einer Sache widmen.", example: "Er hat sich voll und ganz dem Naturschutz verschrieben.", info: "Verb" },
    { id: 308, term: "etwas perfektionieren", definition: "Die Meisterschaft in einer Fähigkeit erlangen.", example: "Jahrelang hat sie daran gearbeitet, ihre Spieltechnik zu perfektionieren.", info: "Verb" },
    { id: 309, term: "jemanden mitreißen", definition: "Jemanden mit Begeisterung anstecken.", example: "Mit seiner leidenschaftlichen Rede konnte er das Publikum mitreißen.", info: "Verb" },
    { id: 310, term: "für etwas brennen", definition: "Etwas mit großer Energie und Leidenschaft tun.", example: "Man merkt sofort, dass sie für ihre Arbeit als Forscherin brennt.", info: "Verb" },
    { id: 311, term: "aus etwas schöpfen", definition: "Sich aus einer Leidenschaft neue Energie holen.", example: "Aus der Beschäftigung mit Kunst schöpfe ich immer wieder neue Kraft.", info: "Verb" },
    { id: 312, term: "etwas zelebrieren", definition: "Etwas mit großer Intensität betreiben.", example: "Er zelebriert die Zubereitung eines Espressos wie ein heiliges Ritual.", info: "Verb" },
    { id: 313, term: "jemanden/etwas faszinieren", definition: "Eine tiefe Faszination für jemanden oder etwas empfinden.", example: "Die unendliche Weite des Universums hat mich schon immer fasziniert.", info: "Verb" },
    { id: 314, term: "eine Leidenschaft entdecken", definition: "Etwas Neues für sich entdecken und beginnen.", example: "Im Urlaub habe ich meine Leidenschaft für das Tauchen entdeckt.", info: "Verb" },
    { id: 315, term: "abschalten", definition: "Seine Gedanken völlig abschalten und sich entspannen.", example: "Beim Klettern kann ich komplett abschalten und den Alltag vergessen.", info: "Verb" },
    { id: 316, term: "jemanden beseelen", definition: "Jemandem große Freude bereiten.", example: "Der Gedanke, ein eigenes Buch zu schreiben, beseelt sie seit Langem.", info: "Verb" },
    { id: 317, term: "eine Neigung entwickeln", definition: "Ein tiefes Interesse für etwas entwickeln.", example: "Er entwickelte schon früh eine Neigung zu philosophischen Fragestellungen.", info: "Verb" },
    { id: 318, term: "sich auf etwas fokussieren", definition: "Seine ganze Energie auf etwas konzentrieren.", example: "Um Fortschritte zu machen, muss ich mich voll auf das Training fokussieren.", info: "Verb" },
    { id: 319, term: "an etwas feilen", definition: "Etwas bis ins kleinste Detail ausarbeiten.", example: "Er kann stundenlang an einem einzigen Satz feilen, bis er perfekt ist.", info: "Verb" },
    { id: 320, term: "sich entfalten", definition: "Sich in seiner Kreativität frei entfalten.", example: "In der Theatergruppe kann sie sich kreativ voll entfalten.", info: "Verb" },
    { id: 321, term: "sich in etwas vertiefen", definition: "Sich intensiv mit einem Thema beschäftigen.", example: "Wenn ich ein gutes Buch lese, kann ich mich stundenlang darin vertiefen.", info: "Verb" },
    { id: 322, term: "jemandem nacheifern", definition: "Jemandem oder etwas nacheifern, als Vorbild nehmen.", example: "Als junger Musiker eiferte er seinen großen Vorbildern nach.", info: "Verb" },
    { id: 323, term: "regenerieren", definition: "Sich von Stress und Anspannung erholen.", example: "In der Sauna kann ich nach dem Sport optimal regenerieren.", info: "Verb" },
    { id: 324, term: "jemanden für etwas entflammen", definition: "Jemanden für etwas begeistern.", example: "Mit seinen Geschichten über ferne Länder konnte er uns für das Reisen entflammen.", info: "Verb" },
    { id: 325, term: "einer Sache verfallen sein", definition: "Jemandem oder etwas verfallen sein, fast süchtig sein.", example: "Seit seiner ersten Reise ist er dem Kitesurfen regelrecht verfallen.", info: "Verb" },
    { id: 326, term: "leidenschaftlich", definition: "Mit großer Leidenschaft und Hingabe.", example: "Er ist ein leidenschaftlicher Gärtner, der jede freie Minute im Grünen verbringt.", info: "Adjektiv" },
    { id: 327, term: "hingebungsvoll", definition: "Vollkommen in eine Tätigkeit vertieft.", example: "Mit hingebungsvoller Geduld restauriert sie alte Möbel.", info: "Adjektiv" },
    { id: 328, term: "faszinierend", definition: "Eine fesselnde, fast magische Wirkung ausübend.", example: "Ich finde es faszinierend, wie präzise ein Uhrwerk funktioniert.", info: "Adjektiv" },
    { id: 329, term: "schöpferisch", definition: "Die Kreativität und Schöpfungskraft betreffend.", example: "In seinen schöpferischen Phasen schreibt er oft mehrere Gedichte am Tag.", info: "Adjektiv" },
    { id: 330, term: "anregend", definition: "Geistig anregend und inspirierend.", example: "Wir führten eine äußerst anregende Diskussion über zeitgenössische Kunst.", info: "Adjektiv" },
    { id: 331, term: "inspirierend", definition: "Die Sinne ansprechend und belebend.", example: "Die Landschaft war so inspirierend, dass ich sofort anfing zu malen.", info: "Adjektiv" },
    { id: 332, term: "erholsam", definition: "Entspannend und stressabbauend.", example: "Ein Spaziergang im Wald ist für mich die erholsamste Tätigkeit überhaupt.", info: "Adjektiv" },
    { id: 333, term: "erfüllend", definition: "Tiefe Zufriedenheit und Glück bewirkend.", example: "Es ist eine sehr erfüllende Aufgabe, anderen Menschen helfen zu können.", info: "Adjektiv" },
    { id: 334, term: "obsessiv", definition: "Nahezu zwanghaft oder besessen.", example: "Er betreibt sein Hobby mit einer fast obsessiven Detailverliebtheit.", info: "Adjektiv" },
    { id: 335, term: "passioniert", definition: "Regelmäßig und mit großer Disziplin.", example: "Sie ist eine passionierte Läuferin und trainiert bei jedem Wetter.", info: "Adjektiv" },
    { id: 336, term: "zeitintensiv", definition: "Viel Energie und Zeit erfordernd.", example: "Die Restauration des alten Segelboots ist ein sehr zeitintensives Projekt.", info: "Adjektiv" },
    { id: 337, term: "kontemplativ", definition: "Entspannend und beruhigend.", example: "Das meditative Bogenschießen ist eine sehr kontemplative Praxis.", info: "Adjektiv" },
    { id: 338, term: "regenerativ", definition: "Die geistige Erholung fördernd.", example: "Ein Wochenende ohne digitale Medien kann eine stark regenerative Wirkung haben.", info: "Adjektiv" },
    { id: 339, term: "fesselnd", definition: "So fesselnd, dass man nicht aufhören kann.", example: "Der Roman war so fesselnd, dass ich ihn in einer Nacht durchgelesen habe.", info: "Adjektiv" },
    { id: 340, term: "enthusiastisch", definition: "Von unbändiger Energie und Begeisterung.", example: "Sie reagierte enthusiastisch auf den Vorschlag, ein neues Projekt zu starten.", info: "Adjektiv" },
    { id: 341, term: "meditativ", definition: "Eine tiefe, meditative Konzentration erfordernd.", example: "Das Töpfern an der Scheibe hat für mich eine fast meditative Wirkung.", info: "Adjektiv" },
    { id: 342, term: "autotelisch", definition: "Sich selbst belohnend, aus sich selbst heraus motivierend.", example: "Für sie ist das Musizieren eine autotelische Tätigkeit; sie tut es um der Sache selbst willen.", info: "Adjektiv" },
    { id: 343, term: "mit Eifer", definition: "Mit großer Freude und Engagement.", example: "Er stürzte sich mit großem Eifer in die neue Aufgabe.", info: "Adjektiv" },
    { id: 344, term: "unermüdlich", definition: "Unermüdlich und ausdauernd.", example: "Mit unermüdlichem Einsatz hat er das Ziel schließlich erreicht.", info: "Adjektiv" },
    { id: 345, term: "voller Elan", definition: "Begeistert und voller Tatendrang.", example: "Nach dem Urlaub ging er voller Elan an die Arbeit.", info: "Adjektiv" },
    { id: 346, term: "Feuer und Flamme sein für...", definition: "Völlig begeistert und enthusiastisch sein.", example: "Seitdem sie den Dokumentarfilm gesehen hat, ist sie Feuer und Flamme für den Tiefseeschutz.", info: "Idiom" },
    { id: 347, term: "in etwas voll und ganz aufgehen", definition: "Sich vollkommen in eine Tätigkeit oder ein Thema vertiefen.", example: "Wenn ich im Garten arbeite, kann ich darin voll und ganz aufgehen und vergesse alles um mich herum.", info: "Idiom" },
    { id: 348, term: "der Ausgleich zum Alltag sein", definition: "Der Ausgleich zum anstrengenden Alltag oder Beruf sein.", example: "Das Klavierspielen ist für mich der perfekte Ausgleich zum rationalen Denken im Beruf.", info: "Phrase" },
    { id: 349, term: "den Kopf freibekommen", definition: "Den Kopf frei bekommen, Sorgen und Stress vergessen.", example: "Eine lange Radtour ist für mich die beste Methode, um den Kopf freizubekommen.", info: "Phrase" },
    { id: 350, term: "Eine Welt ohne ... wäre unvorstellbar.", definition: "Ohne eine bestimmte Sache nicht leben oder existieren können.", example: "Eine Welt ohne Musik wäre für mich absolut unvorstellbar.", info: "Phrase" }
  ],
  6: [
    { id: 351, term: "das Schlüsselerlebnis", definition: "Ein unvergesslicher, prägender Moment.", example: "Der Sonnenaufgang über dem Vulkan war ein Schlüsselerlebnis, das meine Sicht auf die Natur veränderte.", info: "Plural: die Schlüsselerlebnisse" },
    { id: 352, term: "das Flair", definition: "Die besondere Atmosphäre oder Ausstrahlung eines Ortes.", example: "Die kleinen Gassen der Altstadt verströmen ein unvergleichliches mediterranes Flair.", info: "Singular" },
    { id: 353, term: "das Fernweh", definition: "Ein Gefühl der Sehnsucht nach fernen Orten.", example: "Schon als Kind litt ich unter starkem Fernweh und träumte von Abenteuern.", info: "Singular" },
    { id: 354, term: "die Expedition", definition: "Eine Reise abseits der üblichen Touristenrouten.", example: "Unsere Wanderung durch den unberührten Dschungel glich eher einer Expedition als einem Urlaub.", info: "Plural: die Expeditionen" },
    { id: 355, term: "die Immersion", definition: "Die intensive Erfahrung, in eine fremde Kultur einzutauchen.", example: "Die Immersion in die lokale Lebensweise war der wertvollste Teil der Reise.", info: "Singular" },
    { id: 356, term: "der Zwischenfall", definition: "Ein unerwartetes, oft negatives Ereignis.", example: "Abgesehen von einem kleinen Zwischenfall mit dem Mietwagen verlief die Reise reibungslos.", info: "Plural: die Zwischenfälle" },
    { id: 357, term: "die Impression", definition: "Die Gesamtheit der Eindrücke, die man an einem Ort sammelt.", example: "Die vielfältigen Impressionen der Reise haben sich tief in mein Gedächtnis eingeprägt.", info: "Plural: die Impressionen" },
    { id: 358, term: "das Panorama", definition: "Die atemberaubende Aussicht auf eine Landschaft.", example: "Vom Berggipfel aus bot sich uns ein atemberaubendes 360-Grad-Panorama.", info: "Plural: die Panoramen" },
    { id: 359, term: "die Gastfreundschaft", definition: "Die herzliche Aufnahme von Gästen.", example: "Die überwältigende Gastfreundschaft der Einheimischen hat uns zutiefst berührt.", info: "Singular" },
    { id: 360, term: "die Abgeschiedenheit", definition: "Ein Zustand der Ruhe und Abgeschiedenheit.", example: "Wir verbrachten eine Woche in der völligen Abgeschiedenheit einer Berghütte.", info: "Singular" },
    { id: 361, term: "die Strapaze", definition: "Eine anstrengende, mühsame Unternehmung.", example: "Trotz aller Strapazen hat sich der Aufstieg zum Gipfel absolut gelohnt.", info: "Plural: die Strapazen" },
    { id: 362, term: "die Desorientierung", definition: "Das Gefühl der Orientierungslosigkeit in einer neuen Umgebung.", example: "Die anfängliche Desorientierung in der riesigen Metropole wich bald einer neugierigen Entdeckerlust.", info: "Singular" },
    { id: 363, term: "der Rückzugsort", definition: "Ein Ort der Ruhe und Erholung.", example: "Das kleine Café wurde während unserer Reise zu unserem täglichen Rückzugsort.", info: "Plural: die Rückzugsorte" },
    { id: 364, term: "die Erkenntnis", definition: "Eine tiefe persönliche Erkenntnis.", example: "Die wichtigste Erkenntnis dieser Reise war, wie wenig man zum Glücklichsein braucht.", info: "Plural: die Erkenntnisse" },
    { id: 365, term: "der Abstecher", definition: "Ein kurzer Abstecher von der geplanten Route.", example: "Wir machten einen spontanen Abstecher in ein kleines Fischerdorf an der Küste.", info: "Plural: die Abstecher" },
    { id: 366, term: "die Kulinarik", definition: "Die Gesamtheit der kulinarischen Spezialitäten einer Region.", example: "Die lokale Kulinarik war ein Highlight der Reise; wir haben viele neue Gerichte probiert.", info: "Singular" },
    { id: 367, term: "die Authentizität", definition: "Das einzigartige Wesen eines Ortes.", example: "Abseits der Touristenpfade erlebten wir die wahre Authentizität des Landes.", info: "Singular" },
    { id: 368, term: "die Fülle", definition: "Die Vielfalt und der Reichtum an etwas.", example: "Wir waren überwältigt von der Fülle an Eindrücken, Farben und Gerüchen auf dem Markt.", info: "Singular" },
    { id: 369, term: "das Itinerar", definition: "Die Reiseroute oder der geplante Reiseverlauf.", example: "Unser Itinerar war ambitioniert, aber wir haben alle geplanten Stationen geschafft.", info: "Plural: die Itinerare" },
    { id: 370, term: "die Ehrfurcht", definition: "Ein tiefes Gefühl der Ehrfurcht vor der Natur oder Kunst.", example: "Angesichts der majestätischen Bergkette empfand ich eine tiefe Ehrfurcht.", info: "Singular" },
    { id: 371, term: "das unvorhergesehene Ereignis", definition: "Ein unvorhergesehenes Ereignis.", example: "Ein unvorhergesehenes Ereignis zwang uns, unsere Reisepläne kurzfristig zu ändern.", info: "Plural: die unvorhergesehenen Ereignisse" },
    { id: 372, term: "der Höhepunkt", definition: "Der Höhepunkt oder wichtigste Teil einer Reise oder eines Erlebnisses.", example: "Der absolute Höhepunkt der Reise war die Beobachtung der Polarlichter.", info: "Plural: die Höhepunkte" },
    { id: 373, term: "die Begegnung", definition: "Eine Begegnung mit Menschen oder Tieren.", example: "Die Begegnung mit einer Nomadenfamilie in der Wüste war unvergesslich.", info: "Plural: die Begegnungen" },
    { id: 374, term: "die Landschaft", definition: "Die Gesamtheit der landschaftlichen Merkmale.", example: "Die karge Vulkanlandschaft hatte eine ganz eigene, faszinierende Ästhetik.", info: "Plural: die Landschaften" },
    { id: 375, term: "der Anblick", definition: "Die Gesamtheit der visuellen Eindrücke.", example: "Der Anblick des Sternenhimmels in der Wüste war schlichtweg spektakulär.", info: "Plural: die Anblicke" },
    { id: 376, term: "sich einprägen", definition: "Sich tief im Gedächtnis verankern.", example: "Dieses Bild hat sich unauslöschlich in mein Gedächtnis eingeprägt.", info: "Verb" },
    { id: 377, term: "erkunden", definition: "Einen Ort erkunden und entdecken.", example: "Wir haben die verwinkelten Gassen der Altstadt stundenlang erkundet.", info: "Verb" },
    { id: 378, term: "jemanden/etwas wahrnehmen", definition: "Die Sinne stark ansprechen und beeindrucken.", example: "Ich nahm die fremde Umgebung mit all meinen Sinnen wahr.", info: "Verb" },
    { id: 379, term: "jemanden berühren", definition: "Jemanden tief emotional berühren.", example: "Die Lebensfreude der Menschen trotz ihrer Armut hat mich zutiefst berührt.", info: "Verb" },
    { id: 380, term: "jemanden/etwas beeindrucken", definition: "Jemanden oder etwas sehr stark beeindrucken.", example: "Die gigantischen Ausmaße der Tempelanlage haben mich tief beeindruckt.", info: "Verb" },
    { id: 381, term: "sich begeben", definition: "Sich von der gewohnten Umgebung entfernen.", example: "Wir begaben uns auf einen kaum bekannten Pfad tief in den Wald hinein.", info: "Verb" },
    { id: 382, term: "von der Route abweichen", definition: "Von einer geplanten Route abweichen.", example: "Wir sind bewusst von der geplanten Route abgewichen, um Neues zu entdecken.", info: "Verb" },
    { id: 383, term: "reflektieren", definition: "Über etwas Erlebtes nachdenken.", example: "Erst nach der Reise konnte ich in Ruhe über all die Erlebnisse reflektieren.", info: "Verb" },
    { id: 384, term: "etwas bestaunen", definition: "Etwas mit eigenen Augen sehen.", example: "Wir konnten die beeindruckende Architektur der Kathedrale aus nächster Nähe bestaunen.", info: "Verb" },
    { id: 385, term: "in etwas eintauchen", definition: "Sich in eine fremde Welt oder Kultur vertiefen.", example: "Es war faszinierend, in die jahrtausendealte Geschichte des Ortes einzutauchen.", info: "Verb" },
    { id: 386, term: "an seine Grenzen stoßen", definition: "Die eigenen Grenzen erkennen oder überschreiten.", example: "Bei der anspruchsvollen Bergtour bin ich körperlich an meine Grenzen gestoßen.", info: "Verb" },
    { id: 387, term: "den Horizont erweitern", definition: "Die wahre Natur von etwas erkennen.", example: "Diese Reise hat meinen Horizont erweitert und viele Vorurteile abgebaut.", info: "Verb" },
    { id: 388, term: "auf etwas stoßen", definition: "Völlig unerwartet auf etwas stoßen.", example: "Zufällig stießen wir auf eine versteckte Bucht mit kristallklarem Wasser.", info: "Verb" },
    { id: 389, term: "improvisieren", definition: "Sich spontan zu etwas entschließen.", example: "Als unser Zug ausfiel, mussten wir improvisieren und sind per Anhalter weitergefahren.", info: "Verb" },
    { id: 390, term: "sich einer Herausforderung stellen", definition: "Den eigenen Mut auf die Probe stellen.", example: "Sich allein in einem fremden Land zurechtzufinden, war eine Herausforderung, der ich mich gerne gestellt habe.", info: "Verb" },
    { id: 391, term: "sich vorwagen", definition: "Sich an einen Ort wagen, der unbekannt ist.", example: "Wir wagten uns in ein Viertel vor, das in keinem Reiseführer erwähnt wurde.", info: "Verb" },
    { id: 392, term: "durchqueren", definition: "Einen Ort durchqueren.", example: "Wir haben die Wüste mit einem Geländewagen durchquert.", info: "Verb" },
    { id: 393, term: "etwas dokumentieren", definition: "Etwas bildlich oder schriftlich festhalten.", example: "Ich habe meine Reiseerlebnisse in einem Blog ausführlich dokumentiert.", info: "Verb" },
    { id: 394, term: "die Perspektive wechseln", definition: "Die eigene Perspektive verändern.", example: "Die Reise zwang mich, die Perspektive auf mein eigenes Leben zu wechseln.", info: "Verb" },
    { id: 395, term: "jemanden prägen", definition: "Jemanden nachhaltig beeinflussen.", example: "Die Begegnungen mit den Menschen dort haben mich als Person nachhaltig geprägt.", info: "Verb" },
    { id: 396, term: "atemberaubend", definition: "So beeindruckend, dass es einem den Atem raubt.", example: "Die Aussicht vom Gipfel war einfach atemberaubend.", info: "Adjektiv" },
    { id: 397, term: "unbeschreiblich", definition: "Nicht in Worte zu fassen.", example: "Das Gefühl, die Polarlichter zu sehen, war unbeschreiblich.", info: "Adjektiv" },
    { id: 398, term: "unvergesslich", definition: "So, dass man es nie vergessen wird.", example: "Der Tauchgang am Korallenriff war ein unvergessliches Erlebnis.", info: "Adjektiv" },
    { id: 399, term: "abgelegen", definition: "Weit entfernt von Zivilisation und Tourismus.", example: "Wir fanden ein kleines, abgelegenes Dorf, das seine Ursprünglichkeit bewahrt hat.", info: "Adjektiv" },
    { id: 400, term: "unberührt", definition: "In seiner ursprünglichen Form erhalten.", example: "Wir wanderten stundenlang durch eine scheinbar unberührte Landschaft.", info: "Adjektiv" },
    { id: 401, term: "authentisch", definition: "Den Charakter und die Kultur eines Ortes authentisch widerspiegelnd.", example: "Auf dem lokalen Markt erlebten wir das authentische Leben der Einheimischen.", info: "Adjektiv" },
    { id: 402, term: "majestätisch", definition: "Majestätisch und erhaben.", example: "Die majestätischen Gletscher der Arktis waren ein ehrfurchtgebietender Anblick.", info: "Adjektiv" },
    { id: 403, term: "exotisch", definition: "Fremd und ungewöhnlich.", example: "Die exotischen Früchte auf dem Markt sahen nicht nur bunt aus, sie schmeckten auch köstlich.", info: "Adjektiv" },
    { id: 404, term: "facettenreich", definition: "Kulturell und historisch sehr reich und vielfältig.", example: "Indien ist ein unglaublich facettenreiches Land mit unzähligen Kulturen und Landschaften.", info: "Adjektiv" },
    { id: 405, term: "spontan", definition: "Ohne Plan und spontan.", example: "Unsere spontane Entscheidung, die Reiseroute zu ändern, war die beste des ganzen Urlaubs.", info: "Adjektiv" },
    { id: 406, term: "prägend", definition: "So, dass es eine tiefe persönliche Veränderung bewirkt.", example: "Diese Reise war eine prägende Erfahrung, die mein weiteres Leben beeinflusst hat.", info: "Adjektiv" },
    { id: 407, term: "kontemplativ", definition: "Nachdenklich und besinnlich.", example: "Die Stille im Kloster lud zu kontemplativen Momenten der Selbstreflexion ein.", info: "Adjektiv" },
    { id: 408, term: "endemisch", definition: "Nur an einem bestimmten Ort vorkommend.", example: "Auf dieser Insel konnten wir viele endemische Pflanzen- und Tierarten beobachten.", info: "Adjektiv" },
    { id: 409, term: "bereichernd", definition: "Kulturell und intellektuell bereichernd.", example: "Die Gespräche mit den Menschen vor Ort waren eine ungemein bereichernde Erfahrung.", info: "Adjektiv" },
    { id: 410, term: "grandios", definition: "Sehr beeindruckend und großartig.", example: "Das grandiose Finale des Festivals war ein Feuerwerk der Farben und Klänge.", info: "Adjektiv" },
    { id: 411, term: "turbulent", definition: "Von chaotischer und lebhafter Energie.", example: "Das turbulente Treiben auf den Straßen von Marrakesch war faszinierend und anstrengend zugleich.", info: "Adjektiv" },
    { id: 412, term: "abgeschieden", definition: "Isoliert und weit weg.", example: "Wir genossen die abgeschiedene Lage unserer Hütte mitten im Wald.", info: "Adjektiv" },
    { id: 413, term: "intensiv", definition: "Die Sinne stark ansprechend.", example: "Die intensiven Gerüche auf dem Gewürzmarkt waren überwältigend.", info: "Adjektiv" },
    { id: 414, term: "retrospektiv", definition: "Im Nachhinein betrachtet.", example: "Retrospektiv betrachtet war selbst die Reifenpanne ein lustiges Abenteuer.", info: "Adjektiv" },
    { id: 415, term: "unvergleichlich", definition: "Einzigartig und unvergleichlich.", example: "Die Gastfreundschaft, die wir erfahren haben, war unvergleichlich.", info: "Adjektiv" },
    { id: 416, term: "ausgetretene Pfade verlassen", definition: "Sich von den üblichen Wegen entfernen, um das Echte zu entdecken.", example: "Um das wahre Wesen des Landes kennenzulernen, muss man bereit sein, ausgetretene Pfade zu verlassen.", info: "Idiom" },
    { id: 417, term: "über den eigenen Tellerrand schauen", definition: "Die eigene Perspektive und das Wissen erweitern.", example: "Reisen ist die beste Möglichkeit, um über den eigenen Tellerrand zu schauen und neue Perspektiven zu gewinnen.", info: "Idiom" },
    { id: 418, term: "die Erwartungen übertreffen", definition: "Ein Erlebnis, das alle Erwartungen übertrifft.", example: "Die Schönheit der Landschaft hat all meine Erwartungen bei Weitem übertroffen.", info: "Phrase" },
    { id: 419, term: "sich ins Gedächtnis einbrennen", definition: "Sich unauslöschlich im Gedächtnis festsetzen.", example: "Der Anblick des Sonnenuntergangs über dem Meer hat sich für immer in mein Gedächtnis eingebrannt.", info: "Phrase" },
    { id: 420, term: "fernab jeglicher Zivilisation", definition: "Weit weg von der Zivilisation oder dem gewohnten Umfeld sein.", example: "Wir verbrachten drei Tage in einer Hütte, fernab jeglicher Zivilisation, ohne Strom und Internet.", info: "Phrase" }
  ],
  7: [
    { id: 421, term: "der Brauch", definition: "Eine traditionelle Sitte oder Gewohnheit.", example: "Es ist ein alter Brauch, zu Ostern bunt gefärbte Eier zu verstecken.", info: "Plural: die Bräuche" },
    { id: 422, term: "das Ritual", definition: "Eine festliche Handlung mit festgelegten Regeln.", example: "Das Anzünden der Kerzen ist ein festes Ritual am Beginn der Zeremonie.", info: "Plural: die Rituale" },
    { id: 423, term: "das Volksfest", definition: "Ein großes öffentliches Fest mit traditionellem Charakter.", example: "Das Oktoberfest ist das weltweit größte Volksfest und tief in der bayerischen Kultur verwurzelt.", info: "Plural: die Volksfeste" },
    { id: 424, term: "der Gedenktag", definition: "Ein Tag, an dem an ein wichtiges Ereignis erinnert wird.", example: "Der Tag der Deutschen Einheit ist ein nationaler Gedenktag und gesetzlicher Feiertag.", info: "Plural: die Gedenktage" },
    { id: 425, term: "das Kulturerbe", definition: "Die Gesamtheit der kulturalen Werte und Traditionen, die von Generation zu Generation weitergegeben werden.", example: "Viele historische Altstädte gehören zum UNESCO-Weltkulturerbe.", info: "Singular" },
    { id: 426, term: "die Symbolik", definition: "Die symbolische Bedeutung von etwas.", example: "Die Symbolik des Feuers steht bei diesem Fest für Reinigung und Neubeginn.", info: "Singular" },
    { id: 427, term: "die Austragung", definition: "Die Art und Weise, wie ein Ereignis gefeiert oder begangen wird.", example: "Die Austragung des Festivals findet jedes Jahr auf dem historischen Marktplatz statt.", info: "Plural: die Austragungen" },
    { id: 428, term: "die Zelebrierung", definition: "Die feierliche Durchführung eines Ereignisses.", example: "Die Zelebrierung der Sommersonnenwende hat eine lange, heidnische Tradition.", info: "Singular" },
    { id: 429, term: "die Feierlichkeit", definition: "Die besondere, feierliche Stimmung eines Ortes oder Ereignisses.", example: "Die Feierlichkeit des Moments wurde durch die klassische Musik unterstrichen.", info: "Plural: die Feierlichkeiten" },
    { id: 430, term: "der Eckpfeiler", definition: "Ein fester Bestandteil einer Kultur oder Tradition.", example: "Das Erntedankfest ist ein Eckpfeiler des ländlichen Brauchtums.", info: "Plural: die Eckpfeiler" },
    { id: 431, term: "das generationenübergreifende Ereignis", definition: "Ein Ereignis, das Generationen verbindet.", example: "Das jährliche Stadtfest ist ein generationenübergreifendes Ereignis, das Jung und Alt zusammenbringt.", info: "Plural: die generationenübergreifenden Ereignisse" },
    { id: 432, term: "das kollektive Gedächtnis", definition: "Die kollektive Erinnerung einer Gesellschaft an ihre Vergangenheit.", example: "Historische Gedenktage sind wichtig, um das kollektive Gedächtnis wachzuhalten.", info: "Singular" },
    { id: 433, term: "die Signifikanz", definition: "Die Bedeutung und Wichtigkeit eines Ereignisses.", example: "Die historische Signifikanz dieses Tages ist unbestritten.", info: "Singular" },
    { id: 434, term: "die Genese", definition: "Der Ursprung oder die Herkunft von etwas.", example: "Die Genese dieses modernen Festivals liegt in einem alten heidnischen Ritual.", info: "Singular" },
    { id: 435, term: "die Darbietung", definition: "Die öffentliche Zurschaustellung von etwas.", example: "Die Tanzgruppen bereiten sich monatelang auf ihre Darbietungen beim Karnevalsumzug vor.", info: "Plural: die Darbietungen" },
    { id: 436, term: "der Höhepunkt", definition: "Der Höhepunkt oder wichtigste Teil einer Veranstaltung.", example: "Der Höhepunkt des Festivals ist das große Feuerwerk am letzten Abend.", info: "Plural: die Höhepunkte" },
    { id: 437, term: "die Renaissance", definition: "Die Wiederbelebung einer alten Tradition.", example: "In den letzten Jahren erlebte dieses fast vergessene Handwerk eine wahre Renaissance.", info: "Plural: die Renaissancen" },
    { id: 438, term: "das Brauchtum", definition: "Die Gesamtheit der Bräuche und Traditionen.", example: "Das örtliche Museum widmet eine ganze Abteilung dem regionalen Brauchtum.", info: "Singular" },
    { id: 439, term: "die identitätsstiftende Wirkung", definition: "Die Bedeutung für die Identität einer Gruppe.", example: "Nationale Feiertage haben oft eine starke identitätsstiftende Wirkung.", info: "Plural: die identitätsstiftenden Wirkungen" },
    { id: 440, term: "die Zäsur", definition: "Ein Ereignis, das eine Wende oder Veränderung markiert.", example: "Die Wiedervereinigung war eine historische Zäsur für die deutsche Gesellschaft.", info: "Plural: die Zäsuren" },
    { id: 441, term: "der Ursprung", definition: "Die ursprüngliche Form oder Herkunft.", example: "Der Ursprung dieses Festes lässt sich bis ins Mittelalter zurückverfolgen.", info: "Plural: die Ursprünge" },
    { id: 442, term: "der Festumzug", definition: "Ein großer Umzug bei einem Fest.", example: "Der farbenprächtige Festumzug zieht jedes Jahr Tausende von Zuschauer an.", info: "Plural: die Festumzüge" },
    { id: 443, term: "das Gemeinschaftsgefühl", definition: "Das Zusammengehörigkeitsgefühl.", example: "Gemeinsame Feste stärken das Gemeinschaftsgefühl innerhalb eines Dorfes.", info: "Singular" },
    { id: 444, term: "die Überlieferung", definition: "Die Gesamtheit der überlieferten Traditionen.", example: "Mündliche Überlieferungen spielen in unserer Kultur eine wichtige Rolle.", info: "Plural: die Überlieferungen" },
    { id: 445, term: "der Ablauf", definition: "Die Abfolge von Handlungen bei einem Fest oder Ritual.", example: "Der Ablauf der Zeremonie ist seit Jahrhunderten genau festgelegt.", info: "Plural: die Abläufe" },
    { id: 446, term: "zelebrieren", definition: "Ein Fest oder Ereignis feierlich begehen.", example: "In meiner Familie zelebrieren wir das Weihnachtsfest mit vielen alten Traditionen.", info: "Verb" },
    { id: 447, term: "gedenken (+ Genitiv)", definition: "An eine Person oder ein Ereignis erinnern.", example: "Am Volkstrauertag gedenken wir der Opfer von Krieg und Gewaltherrschaft.", info: "Verb" },
    { id: 448, term: "symbolisieren", definition: "Symbolisch für etwas stehen.", example: "Die weiße Taube symbolisiert in vielen Kulturen den Frieden.", info: "Verb" },
    { id: 449, term: "überliefern", definition: "Von Generation zu Generation weitergeben.", example: "Diese Legenden wurden über Jahrhunderte mündlich überliefert.", info: "Verb" },
    { id: 450, term: "eine Tradition pflegen", definition: "Eine Tradition am Leben erhalten.", example: "Wir pflegen die Tradition, uns jeden Sonntag zum gemeinsamen Mittagessen zu treffen.", info: "Verb" },
    { id: 451, term: "auf etwas zurückgehen", definition: "Den Ursprung in etwas haben.", example: "Der Brauch des Maibaumaufstellens geht auf heidnische Fruchtbarkeitsriten zurück.", info: "Verb" },
    { id: 452, term: "abhalten", definition: "Ein Ereignis veranstalten.", example: "Das Weinfest wird jedes Jahr im September abgehalten.", info: "Verb" },
    { id: 453, term: "wiederbeleben", definition: "Eine Tradition wiederbeleben.", example: "Engagierte Bürger haben das fast vergessene Stadtfest wiederbelebt.", info: "Verb" },
    { id: 454, term: "jemanden ehren", definition: "Jemanden ehren oder würdigen.", example: "Mit diesem Denkmal ehrt die Stadt ihre berühmtesten Söhne und Töchter.", info: "Verb" },
    { id: 455, term: "etwas einläuten", definition: "Den Beginn von etwas markieren.", example: "Das Läuten der Kirchenglocken läutet traditionell das Volksfest ein.", info: "Verb" },
    { id: 456, term: "etwas prägen", definition: "Den Charakter von etwas bestimmen.", example: "Regionale Spezialitäten und traditionelle Musik prägen den Charakter dieses Festes.", info: "Verb" },
    { id: 457, term: "etwas hochhalten", definition: "Etwas als wichtig und wertvoll ansehen.", example: "In unserer Gemeinschaft wird der Respekt vor den Älteren hochgehalten.", info: "Verb" },
    { id: 458, term: "etwas reflektieren", definition: "Die Bedeutung von etwas reflektieren.", example: "In seiner Rede reflektierte der Bürgermeister die historische Bedeutung des Tages.", info: "Verb" },
    { id: 459, term: "sich um etwas ranken", definition: "Sich um einen zentralen Punkt oder ein Thema drehen.", example: "Um dieses alte Schloss ranken sich zahlreiche Mythen und Legenden.", info: "Verb" },
    { id: 460, term: "institutionalisieren", definition: "Etwas fest im kulturellen Leben verankern.", example: "Was als spontane Feier begann, wurde über die Jahre als offizielles Stadtfest institutionalisiert.", info: "Verb" },
    { id: 461, term: "sich versammeln", definition: "Sich versammeln, zusammenkommen.", example: "Die ganze Dorfgemeinschaft versammelt sich auf dem Marktplatz.", info: "Verb" },
    { id: 462, term: "etwas einweihen", definition: "Etwas feierlich eröffnen.", example: "Der Bürgermeister wird die neue Festhalle feierlich einweihen.", info: "Verb" },
    { id: 463, term: "sich vererben", definition: "Sich von Generation zu Generation vererben.", example: "Dieser Brauch hat sich über viele Generationen hinweg vererbt.", info: "Verb" },
    { id: 464, term: "etwas auszeichnen", definition: "Etwas als charakteristisch für etwas ansehen.", example: "Was dieses Festival auszeichnet, ist die Mischung aus traditioneller und moderner Musik.", info: "Verb" },
    { id: 465, term: "etwas eine Bedeutung beimessen", definition: "Etwas eine besondere Bedeutung geben.", example: "Die Menschen messen diesem Ritual eine große spirituelle Bedeutung bei.", info: "Verb" },
    { id: 466, term: "traditionell", definition: "Der Tradition entsprechend.", example: "Zu diesem Anlass wird traditionelle Kleidung getragen.", info: "Adjektiv" },
    { id: 467, term: "säkular", definition: "Weltlich, nicht religiös.", example: "Obwohl Weihnachten einen religiösen Ursprung hat, wird es heute oft als säkulares Familienfest gefeiert.", info: "Adjektiv" },
    { id: 468, term: "zeremoniell", definition: "Feierlich und würdevoll.", example: "Der zeremonielle Akt der Krönung wurde live im Fernsehen übertragen.", info: "Adjektiv" },
    { id: 469, term: "überliefert", definition: "Von Generation zu Generation überliefert.", example: "Das Rezept für diesen Kuchen ist ein altes, überliefertes Familiengeheimnis.", info: "Adjektiv" },
    { id: 470, term: "tief verwurzelt", definition: "Fest im kulturellen Bewusstsein verankert.", example: "Die Tradition des Karnevals ist in dieser Region tief verwurzelt.", info: "Adjektiv" },
    { id: 471, term: "denkwürdig", definition: "Denkwürdig, historisch bedeutsam.", example: "Der Fall der Berliner Mauer war ein denkwürdiger Moment in der deutschen Geschichte.", info: "Adjektiv" },
    { id: 472, term: "regional", definition: "Nur in einer bestimmten Region vorkommend.", example: "Dieses Fest ist eine regionale Besonderheit und außerhalb kaum bekannt.", info: "Adjektiv" },
    { id: 473, term: "identitätsstiftend", definition: "Die Identität einer Gruppe stärkend.", example: "Gemeinsame Rituale können eine starke identitätsstiftende Wirkung haben.", info: "Adjektiv" },
    { id: 474, term: "epochal", definition: "Eine Epoche oder einen Wendepunkt markierend.", example: "Die Erfindung des Internets war ein epochales Ereignis mit weitreichenden Folgen.", info: "Adjektiv" },
    { id: 475, term: "nicht-kommerziell", definition: "Nicht kommerziell, ohne Profitinteresse.", example: "Es handelt sich um ein nicht-kommerzielles Festival, das von Freiwilligen organisiert wird.", info: "Adjektiv" },
    { id: 476, term: "ausgelassen", definition: "Fröhlich und ausgelassen.", example: "Auf dem Fest herrschte eine ausgelassene und fröhliche Stimmung.", info: "Adjektiv" },
    { id: 477, term: "ursprünglich", definition: "Die ursprüngliche Form betreffend.", example: "Ursprünglich war dieses Fest ein Ritual, um die Wintergeister zu vertreiben.", info: "Adjektiv" },
    { id: 478, term: "alljährlich", definition: "Einmalig im Jahr stattfindend.", example: "Der alljährliche Weihnachtsmarkt ist ein fester Bestandteil der Vorweihnachtszeit.", info: "Adjektiv" },
    { id: 479, term: "memorabel", definition: "Denkwürdig, lange in Erinnerung bleibend.", example: "Die Abschlusszeremonie war ein memorabler Moment für alle Absolventen.", info: "Adjektiv" },
    { id: 480, term: "prunkvoll", definition: "Von großer Pracht und Imposanz.", example: "Der prunkvolle Umzug des Königs wurde von Tausenden bejubelt.", info: "Adjektiv" },
    { id: 481, term: "symbolträchtig", definition: "Symbolisch, eine tiefere Bedeutung habend.", example: "Die Unterzeichnung des Vertrags an diesem historischen Ort war ein symbolträchtiger Akt.", info: "Adjektiv" },
    { id: 482, term: "anachronistisch", definition: "Nicht mehr zeitgemäß.", example: "Manche empfinden diesen alten Brauch heute als anachronistisch.", info: "Adjektiv" },
    { id: 483, term: "öffentlich", definition: "Öffentlich und für alle zugänglich.", example: "Die Gedenkfeier ist öffentlich und jeder ist herzlich eingeladen.", info: "Adjektiv" },
    { id: 484, term: "gemeinschaftlich", definition: "Eine Gemeinschaft betreffend.", example: "Das gemeinschaftliche Singen von Liedern ist Teil des Festes.", info: "Adjektiv" },
    { id: 485, term: "feierlich", definition: "Feierlich, festlich.", example: "Die feierliche Atmosphäre in der Kirche war sehr bewegend.", info: "Adjektiv" },
    { id: 486, term: "von Generation zu Generation weitergeben", definition: "Etwas wird von Generation zu Generation weitergegeben.", example: "In meiner Familie wird das Wissen über die Kräuterheilkunde von Generation zu Generation weitergegeben.", info: "Phrase" },
    { id: 487, term: "einen festen Platz im Kalender haben", definition: "Einen festen, unveränderlichen Platz im Kalender haben.", example: "Das Erntedankfest hat einen festen Platz im Kalender der ländlichen Gemeinden.", info: "Phrase" },
    { id: 488, term: "die kulturelle Vielfalt widerspiegeln", definition: "Die kulturelle Vielfalt und den Reichtum einer Gesellschaft widerspiegeln.", example: "Die unterschiedlichen Feste im Jahresverlauf spiegeln die kulturelle Vielfalt unseres Landes wider.", info: "Phrase" },
    { id: 489, term: "etwas am Leben erhalten", definition: "Etwas am Leben erhalten und vor dem Vergessen bewahren.", example: "Durch jährliche Aufführungen versucht der Verein, diesen alten Volkstanz am Leben zu erhalten.", info: "Phrase" },
    { id: 490, term: "fester Bestandteil des kulturellen Lebens sein", definition: "Ein fester und unverzichtbarer Teil von etwas sein.", example: "Das wöchentliche Markt ist ein fester Bestandteil des kulturellen Lebens in unserer Stadt.", info: "Phrase" }
  ],
  8: [
    { id: 491, term: "die Anekdote", definition: "Eine kurze, oft humorvolle oder pointierte Erzählung eines realen Erlebnisses.", example: "Er unterhält die ganze Gesellschaft immer mit Anekdoten aus seiner Jugend.", info: "Plural: die Anekdoten" },
    { id: 492, term: "das Malheur", definition: "Ein peinlicher Fauxpas oder eine Blamage.", example: "Bei der Präsentation passierte ihm ein kleines Malheur mit dem Beamer.", info: "Plural: die Malheure" },
    { id: 493, term: "das Missverständnis", definition: "Ein lustiges oder peinliches Missverständnis in der Kommunikation.", example: "Ein amüsantes Missverständnis führte dazu, dass wir am falschen Treffpunkt warteten.", info: "Plural: die Missverständnisse" },
    { id: 494, term: "die Pointe", definition: "Die überraschende und oft humorvolle Schlusspointe einer Geschichte oder eines Witzes.", example: "Er erzählte die Geschichte so gut, dass die Pointe am Ende alle zum Lachen brachte.", info: "Plural: die Pointen" },
    { id: 495, term: "die Blamage", definition: "Die öffentliche Bloßstellung oder ein peinliches Erlebnis.", example: "Es war eine absolute Blamage, als ich den Namen des Gastgebers vergaß.", info: "Plural: die Blamagen" },
    { id: 496, term: "die Verlegenheit", definition: "Das Gefühl der Peinlichkeit oder Scham.", example: "Man sah ihm seine Verlegenheit an, als er auf seinen Fehler angesprochen wurde.", info: "Singular" },
    { id: 497, term: "die Komik", definition: "Die komische oder lächerliche Seite einer Situation.", example: "Die unfreiwillige Komik der Situation wurde erst im Nachhinein allen bewusst.", info: "Singular" },
    { id: 498, term: "die Ironie", definition: "Subtiler Spott, bei dem das Gegenteil von dem gesagt wird, was gemeint ist.", example: "Die Ironie des Schicksals wollte es, dass der Klempner selbst einen Wasserschaden hatte.", info: "Singular" },
    { id: 499, term: "die Tücke des Objekts", definition: "Eine unvorhergesehene, unglückliche Wendung der Ereignisse.", example: "Die Tücke des Objekts zeigte sich, als der Korken in der Weinflasche abbrach.", info: "Singular" },
    { id: 500, term: "die Schadenfreude", definition: "Die Freude am Unglück oder Missgeschick anderer.", example: "Ein Anflug von Schadenfreude war nicht zu leugnen, als der Angeber im Schlamm ausrutschte.", info: "Singular" },
    { id: 501, term: "der Versprecher", definition: "Ein kleiner sprachlicher Fehler, bei dem man sich verspricht.", example: "Sein lustiger Versprecher sorgte für allgemeine Heiterkeit.", info: "Plural: die Versprecher" },
    { id: 502, term: "die Zwickmühle", definition: "Eine Situation, in der man sich in einer Zwickmühle befindet.", example: "Ich steckte in einer Zwickmühle: Entweder ich gab meinen Fehler zu oder log.", info: "Plural: die Zwickmühlen" },
    { id: 503, term: "der Vorfall", definition: "Ein Vorfall oder ein Ereignis.", example: "Nach dem peinlichen Vorfall wollte er am liebsten im Erdboden versinken.", info: "Plural: die Vorfälle" },
    { id: 504, term: "die Verkettung unglücklicher Umstände", definition: "Eine Kette von unglücklichen oder unvorhergesehenen Ereignissen.", example: "Eine Verkettung unglücklicher Umstände führte dazu, dass ich meinen Flug verpasste.", info: "(feste Wendung, meist im Singular)" },
    { id: 505, term: "der Scherz", definition: "Ein lustiger Einfall oder Streich.", example: "Er erlaubte sich einen kleinen Scherz mit seinem Kollegen.", info: "Plural: die Scherze" },
    { id: 506, term: "die Unachtsamkeit", definition: "Ein Moment der Unaufmerksamkeit.", example: "Aus reiner Unachtsamkeit schüttete ich mir den Kaffee über das Hemd.", info: "Singular" },
    { id: 507, term: "die Schlagfertigkeit", definition: "Die Fähigkeit, schnell und witzig zu antworten.", example: "Sie reagierte auf die peinliche Frage mit beeindruckender Schlagfertigkeit.", info: "Singular" },
    { id: 508, term: "der Fauxpas", definition: "Ein peinlicher gesellschaftlicher Fehler.", example: "Bei einem Staatsbankett ein falsches Besteck zu benutzen, gilt als Fauxpas.", info: "Plural: die Fauxpas" },
    { id: 509, term: "der Hergang", definition: "Die zeitliche Abfolge der Ereignisse in einer Erzählung.", example: "Der genaue Hergang des Missgeschicks ließ sich nicht mehr rekonstruieren.", info: "Singular" },
    { id: 510, term: "das Missgeschick", definition: "Ein kleines Unglück oder Missgeschick.", example: "Das größte Missgeschick auf der Reise war der Verlust meines Koffers.", info: "Plural: die Missgeschicke" },
    { id: 511, term: "die Fehlbarkeit", definition: "Die menschliche Neigung, Fehler zu machen.", example: "Diese Episode war eine amüsante Erinnerung an die menschliche Fehlbarkeit.", info: "Singular" },
    { id: 512, term: "die Wendung", definition: "Ein plötzlicher, meist negativer Umschwung.", example: "Die Geschichte nahm eine unerwartete Wendung, als die Polizei eintraf.", info: "Plural: die Wendungen" },
    { id: 513, term: "das Gelächter", definition: "Das unkontrollierte Lachen.", example: "Die Pointe des Witzes löste schallendes Gelächter aus.", info: "Singular" },
    { id: 514, term: "die Kuriosität", definition: "Eine seltsame oder absurde Geschichte.", example: "Seine Sammlung von Kuriositäten umfasst auch die Geschichte von seinem Papagei im Supermarkt.", info: "Plural: die Kuriositäten" },
    { id: 515, term: "die Befangenheit", definition: "Das Gefühl, sich unwohl und unsicher zu fühlen.", example: "Nach meinem Versprecher konnte ich meine anfängliche Befangenheit kaum ablegen.", info: "Singular" },
    { id: 516, term: "sich blamieren", definition: "Sich vor anderen lächerlich machen.", example: "Ich habe mich vor der ganzen Klasse blamiert, als ich vom Stuhl gefallen bin.", info: "Verb" },
    { id: 517, term: "jemandem/etwas unterlaufen", definition: "Aus Versehen einen Fehler machen.", example: "Mir ist ein peinlicher Fehler unterlaufen, als ich die Namen verwechselt habe.", info: "Verb" },
    { id: 518, term: "erröten", definition: "Rot im Gesicht werden (aus Scham oder Verlegenheit).", example: "Als alle über seinen Versprecher lachten, errötete er bis über beide Ohren.", info: "Verb" },
    { id: 519, term: "sich in etwas täuschen", definition: "Jemanden oder etwas falsch einschätzen.", example: "Ich hatte mich in der Uhrzeit getäuscht und kam eine Stunde zu spät.", info: "Verb" },
    { id: 520, term: "sich versprechen", definition: "Etwas Falsches sagen, sich versprechen.", example: "Der Nachrichtensprecher hat sich live im Fernsehen versprochen.", info: "Verb" },
    { id: 521, term: "jemanden auf den Arm nehmen", definition: "Jemanden mit einem Streich hereinlegen.", example: "Meine Freunde haben mich mit der falschen Adresse ordentlich auf den Arm genommen.", info: "Verb" },
    { id: 522, term: "schmunzeln", definition: "Über etwas lachen, sich amüsieren.", example: "Sogar der Lehrer musste über die kuriose Ausrede des Schülers schmunzeln.", info: "Verb" },
    { id: 523, term: "etwas Revue passieren lassen", definition: "Etwas im Nachhinein betrachten.", example: "Wenn ich die Situation heute Revue passieren lasse, muss ich darüber lachen.", info: "Verb" },
    { id: 524, term: "ins Fettnäpfchen treten", definition: "Unbeabsichtigt einen sozialen Fauxpas begehen.", example: "Mit meiner unbedachten Frage nach ihrem Alter bin ich voll ins Fettnäpfchen getreten.", info: "Verb" },
    { id: 525, term: "jemanden aus dem Konzept bringen", definition: "Jemandem die Fassung oder die Sprache rauben.", example: "Die unerwartete Zwischenfrage hat mich mitten im Vortrag völlig aus dem Konzept gebracht.", info: "Verb" },
    { id: 526, term: "die Fassung verlieren", definition: "Die Beherrschung verlieren oder zeigen.", example: "Trotz der chaotischen Situation verlor sie nie ihre Fassung.", info: "Verb" },
    { id: 527, term: "sich entpuppen als", definition: "Sich als etwas herausstellen.", example: "Was als kleiner Fehler begann, entpuppte sich als riesiges Problem.", info: "Verb" },
    { id: 528, term: "unfreiwillig komisch wirken", definition: "Unfreiwillig komisch wirken.", example: "Seine ernst gemeinte Tanzeinlage wirkte auf das Publikum unfreiwillig komisch.", info: "Verb" },
    { id: 529, term: "eine Situation entschärfen", definition: "Etwas entschärfen, die Spannung nehmen.", example: "Mit einem selbstironischen Witz konnte er die peinliche Situation entschärfen.", info: "Verb" },
    { id: 530, term: "etwas überspielen", definition: "Eine peinliche Situation ignorieren und weitermachen.", example: "Er versuchte, seinen Versprecher zu überspielen und redete einfach weiter.", info: "Verb" },
    { id: 531, term: "im Erdboden versinken wollen", definition: "Sich sehr schämen und unsichtbar sein wollen.", example: "Als mein Handy im stillen Theater klingelte, wäre ich am liebsten im Erdboden versunken.", info: "Phrase" },
    { id: 532, term: "sich etwas eingestehen", definition: "Jemandem oder sich selbst etwas gestehen.", example: "Ich musste mir eingestehen, dass ich die Anweisungen falsch verstanden hatte.", info: "Verb" },
    { id: 533, term: "etwas fehldeuten", definition: "Etwas falsch interpretieren.", example: "Ich habe seine Geste komplett fehlgedeutet und mich dadurch blamiert.", info: "Verb" },
    { id: 534, term: "sich über etwas mokieren", definition: "Sich über etwas lustig machen.", example: "Die anderen mokierten sich über seinen altmodischen Anzug.", info: "Verb" },
    { id: 535, term: "von etwas ausgehen", definition: "Etwas als wahr annehmen (was sich als falsch herausstellt).", example: "Ich war fest davon ausgegangen, dass die Party erst eine Stunde später beginnt.", info: "Verb" },
    { id: 536, term: "urkomisch", definition: "Sehr komisch und zum Lachen reizend.", example: "Die Geschichte von seinem Kochunfall war einfach urkomisch.", info: "Adjektiv" },
    { id: 537, term: "peinlich", definition: "Peinlich, Unbehagen verursachend.", example: "Es war mir äußerst peinlich, als ich vor allen Leuten gestolpert bin.", info: "Adjektiv" },
    { id: 538, term: "absurd", definition: "Seltsam, bizarr und schwer zu erklären.", example: "Die absurde Situation, in der ein Papagei die Einkaufsliste vorlas, brachte alle zum Lachen.", info: "Adjektiv" },
    { id: 539, term: "befangen", definition: "Verlegen und unsicher wirkend.", example: "Nach seinem Fauxpas wirkte er den ganzen Abend über sichtlich befangen.", info: "Adjektiv" },
    { id: 540, term: "unfreiwillig", definition: "Unbeabsichtigt, ohne Absicht.", example: "Seine Verwechslung führte zu einer unfreiwilligen Komik.", info: "Adjektiv" },
    { id: 541, term: "deplatziert", definition: "Unpassend in einer bestimmten Situation.", example: "Ich fühlte mich in meiner Freizeitkleidung auf der eleganten Gala völlig deplatziert.", info: "Adjektiv" },
    { id: 542, term: "misslich", definition: "In einer unangenehmen, schwierigen Lage.", example: "Wir befanden uns in der misslichen Lage, den letzten Bus verpasst zu haben.", info: "Adjektiv" },
    { id: 543, term: "ungeschickt", definition: "Tollpatschig, ungeschickt.", example: "In einem ungeschickten Moment stieß ich das Weinglas vom Tisch.", info: "Adjektiv" },
    { id: 544, term: "im Nachhinein", definition: "Im Nachhinein betrachtet.", example: "Im Nachhinein betrachtet war die ganze Aufregung völlig überflüssig.", info: "Adjektiv" },
    { id: 545, term: "perplex", definition: "Verblüfft und sprachlos.", example: "Ich war so perplex, dass ich kein einziges Wort herausbrachte.", info: "Adjektiv" },
    { id: 546, term: "kurios", definition: "Seltsam und sonderbar.", example: "Das kuriose Ereignis wurde sogar in der Lokalzeitung erwähnt.", info: "Adjektiv" },
    { id: 547, term: "ironisch", definition: "Durch Ironie gekennzeichnet, spöttisch.", example: "Mit einem ironischen Lächeln kommentierte er sein eigenes Missgeschick.", info: "Adjektiv" },
    { id: 548, term: "selbstironisch", definition: "Sich selbst nicht zu ernst nehmend.", example: "Ihre Fähigkeit, selbstironisch über eigene Fehler zu lachen, ist bewundernswert.", info: "Adjektiv" },
    { id: 549, term: "haarsträubend", definition: "So, dass es einem die Sprache verschlägt.", example: "Er erzählte uns eine haarsträubende Geschichte über seine Begegnung mit einem Bären.", info: "Adjektiv" },
    { id: 550, term: "amüsant", definition: "Sehr lustig, amüsant.", example: "Die Anekdote war äußerst amüsant und gut erzählt.", info: "Adjektiv" },
    { id: 551, term: "unvorhergesehen", definition: "Unvorhergesehen und plötzlich.", example: "Ein unvorhergesehener Regenschauer machte unsere Pläne zunichte.", info: "Adjektiv" },
    { id: 552, term: "peinlich berührt", definition: "Auf peinliche Weise berührt.", example: "Ich war peinlich berührt, als meine Mutter alte Kinderfotos von mir zeigte.", info: "Adjektiv" },
    { id: 553, term: "grotesk", definition: "Äußerst komisch, grotesk.", example: "Die Szene hatte etwas Groteskes an sich.", info: "Adjektiv" },
    { id: 554, term: "aus heiterem Himmel", definition: "Völlig unerwartet.", example: "Die peinliche Frage kam für mich völlig aus heiterem Himmel.", info: "Adjektiv" },
    { id: 555, term: "arglos", definition: "Ohne böse Absicht, unschuldig.", example: "Ich hatte die arglose Frage gestellt, ohne die Vorgeschichte zu kennen.", info: "Adjektiv" },
    { id: 556, term: "den Faden verlieren", definition: "Völlig die Beherrschung oder den Überblick verlieren.", example: "Mitten in der Erzählung verlor ich komplett den Faden und wusste nicht mehr, was ich sagen wollte.", info: "Idiom" },
    { id: 557, term: "etwas mit Humor nehmen", definition: "Mit Humor auf eine peinliche Situation reagieren.", example: "Glücklicherweise konnte sie die Situation mit Humor nehmen und über sich selbst lachen.", info: "Phrase" },
    { id: 558, term: "am liebsten im Erdboden versinken", definition: "Sich sehr schämen und unsichtbar sein wollen.", example: "Als mein peinliches Geheimnis verraten wurde, wäre ich am liebsten im Erdboden versunken.", info: "Phrase" },
    { id: 559, term: "jemandem/etwas auf den Leim gehen", definition: "Jemanden oder etwas falsch einschätzen, einer Täuschung erliegen.", example: "Ich bin ihm voll auf den Leim gegangen, als er mir die erfundene Geschichte erzählte.", info: "Phrase" },
    { id: 560, term: "die Situation retten", definition: "Die Situation retten, nachdem etwas schiefgegangen ist.", example: "Mit einer schlagfertigen Antwort konnte er die peinliche Stille durchbrechen und die Situation retten.", info: "Phrase" }
  ]
};

export default function App() {
  const [activeWeekId, setActiveWeekId] = useState(1);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchAllWeeks, setSearchAllWeeks] = useState(true);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'flashcards'
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showCardBack, setShowCardBack] = useState(false);

  const activeWeek = COURSE_WEEKS.find(w => w.id === activeWeekId);
  const currentVocabList = VOCAB_DATA[activeWeekId] || [];

  // Get all vocabulary across all weeks for global search (with week metadata)
  const allVocabList = useMemo(() => {
    const list = [];
    Object.entries(VOCAB_DATA).forEach(([weekIdStr, items]) => {
      const weekId = Number(weekIdStr);
      const weekTitle = COURSE_WEEKS.find(w => w.id === weekId)?.title || `Woche ${weekId}`;
      items.forEach(item => list.push({ ...item, weekId, weekTitle }));
    });
    return list;
  }, []);

  const filteredVocab = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return currentVocabList;
    const source = searchAllWeeks ? allVocabList : currentVocabList;
    return source.filter(item =>
      item.term.toLowerCase().includes(q) ||
      item.definition.toLowerCase().includes(q) ||
      (item.example || '').toLowerCase().includes(q)
    );
  }, [currentVocabList, allVocabList, searchQuery, searchAllWeeks]);

  // Reset card index when filtered results change
  useEffect(() => {
    if (filteredVocab.length === 0) {
      setCurrentCardIndex(0);
      setShowCardBack(false);
    } else if (currentCardIndex >= filteredVocab.length) {
      setCurrentCardIndex(0);
      setShowCardBack(false);
    }
  }, [filteredVocab.length, currentCardIndex]);

  const handleNextCard = () => {
    if (!filteredVocab.length) return;
    setShowCardBack(false);
    setCurrentCardIndex((prev) => (prev + 1) % filteredVocab.length);
  };

  const handlePrevCard = () => {
    if (!filteredVocab.length) return;
    setShowCardBack(false);
    setCurrentCardIndex((prev) => (prev - 1 + filteredVocab.length) % filteredVocab.length);
  }; 

  return (
    <div className="flex h-screen bg-[#0a0a0c] text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 w-72 bg-[#121217] border-r border-slate-800/50 z-50 transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-white tracking-tight">C1 Fluency Sprint</h1>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">German AI Academy</p>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 pb-4 scrollbar-hide">
            <div className="mb-4">
              <p className="px-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Curriculum</p>
              {COURSE_WEEKS.map((week) => (
                <button
                  key={week.id}
                  onClick={() => {
                    setActiveWeekId(week.id);
                    setViewMode('list');
                    setCurrentCardIndex(0);
                    setSearchQuery('');
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group
                    ${activeWeekId === week.id 
                      ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-inner' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}
                  `}
                >
                  <span className={`
                    w-6 h-6 rounded-md flex items-center justify-center text-[10px] border transition-colors
                    ${activeWeekId === week.id ? 'bg-indigo-500 border-indigo-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-500'}
                  `}>
                    {week.id}
                  </span>
                  <span className="flex-1 text-left truncate">{week.title}</span>
                  <ChevronRight className={`w-3 h-3 transition-transform ${activeWeekId === week.id ? 'translate-x-1 opacity-100' : 'opacity-0'}`} />
                </button>
              ))}
            </div>
          </nav>

          <div className="p-4 border-t border-slate-800/50 bg-[#0f0f13]">
            <a 
              href="https://4-month-german-c1-fluency-sprint.vercel.app/german-ai-academy" 
              target="_blank" 
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/60 transition-colors"
            >
              <BrainCircuit className="w-5 h-5 text-indigo-400" />
              <div className="text-xs">
                <p className="text-slate-300 font-semibold">Visit Course Portal</p>
                <p className="text-slate-500">Natural Fluent German</p>
              </div>
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-6 border-b border-slate-800/50 bg-[#0a0a0c]/80 backdrop-blur-md z-30 sticky top-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 text-slate-400 hover:text-slate-200 lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-slate-500 font-light">Woche {activeWeek?.id}:</span>
                {activeWeek?.title}
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 uppercase tracking-tighter">
                  {activeWeek?.format}
                </span>
                <span className="text-[10px] text-slate-500">Focus: {activeWeek?.focus}</span>
                <span className="ml-2 text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  {currentVocabList.length} Items
                </span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text"
                placeholder={searchAllWeeks ? "Search all weeks..." : "Search vocabulary..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-900/50 border border-slate-800 rounded-full pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 w-64 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => setSearchAllWeeks(!searchAllWeeks)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                searchAllWeeks 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                  : 'bg-slate-800/50 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
              title={searchAllWeeks ? "Searching all weeks" : "Search current week only"}
            >
              {searchAllWeeks ? 'All Weeks' : 'This Week'}
            </button>
            {searchQuery && (
              <span className="text-xs text-slate-400">
                {filteredVocab.length} {filteredVocab.length === 1 ? 'result' : 'results'}
              </span>
            )}
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-800">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Mobile Search Bar */}
            <div className="md:hidden space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text"
                  placeholder={searchAllWeeks ? "Search all weeks..." : "Search vocabulary..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-full pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSearchAllWeeks(!searchAllWeeks)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    searchAllWeeks 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                      : 'bg-slate-800/50 text-slate-400'
                  }`}
                >
                  {searchAllWeeks ? 'All Weeks' : 'This Week'}
                </button>
                {searchQuery && (
                  <p className="text-xs text-slate-400">
                    {filteredVocab.length} {filteredVocab.length === 1 ? 'result' : 'results'}
                  </p>
                )}
              </div>
            </div>

            {/* View Selection */}
            <div className="flex p-1 bg-slate-900/50 border border-slate-800 rounded-xl w-fit">
              <button 
                onClick={() => setViewMode('list')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${viewMode === 'list' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <BookOpen className="w-3.5 h-3.5" /> Vocab List
              </button>
              <button 
                onClick={() => setViewMode('flashcards')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${viewMode === 'flashcards' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Trophy className="w-3.5 h-3.5" /> Study Cards
              </button>
            </div>

            {viewMode === 'list' ? (
              <div className="grid grid-cols-1 gap-4">
                {filteredVocab.length > 0 ? (
                  filteredVocab.map((item, idx) => {
                      // item.weekId/weekTitle available when searching across weeks
                      return (
                      <div 
                        key={item.id} 
                        className="group bg-[#121217] border border-slate-800/50 rounded-2xl p-6 hover:border-indigo-500/40 transition-all hover:shadow-xl hover:shadow-indigo-500/5 flex flex-col md:flex-row gap-6"
                      >
                        <div className="md:w-1/3">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                            <span className="text-[10px] font-bold text-indigo-400/80 uppercase tracking-widest">#{item.id} — {item.info}</span>
                            {item.weekId && (
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 uppercase tracking-wider">
                                Woche {item.weekId}
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{item.term}</h3>
                          <p className="text-slate-400 text-sm mt-1">{item.definition}</p>
                        </div>
                        <div className="flex-1 bg-[#0a0a0c]/50 rounded-xl p-4 border border-slate-800/50">
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Beispielsatz</p>
                        <p className="text-slate-300 italic text-sm leading-relaxed">"{item.example}"</p>
                        {searchQuery && item.weekId && (
                          <div className="mt-4 flex items-center gap-2">
                            <button
                              onClick={() => { setActiveWeekId(item.weekId); setViewMode('list'); setSearchQuery(''); setSidebarOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                              className="text-xs px-2 py-1 rounded bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-600/20 transition-colors"
                            >
                              Open week {item.weekId}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                  })
                ) : (
                  <div className="text-center py-20 bg-slate-900/20 rounded-3xl border border-dashed border-slate-800">
                    <Search className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                    <p className="text-slate-500 font-medium">No vocabulary found for "{searchQuery}"</p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mt-4 px-4 py-2 text-sm bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 rounded-lg transition-colors"
                    >
                      Clear search
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Flashcards Mode */
              <div className="flex flex-col items-center">
                {filteredVocab.length > 0 ? (
                  <div className="w-full max-w-lg space-y-8">
                    <div 
                      onClick={() => setShowCardBack(!showCardBack)}
                      className="relative h-80 w-full cursor-pointer perspective-1000 group"
                    >
                      <div className={`
                        relative w-full h-full transition-transform duration-700 transform-style-3d
                        ${showCardBack ? 'rotate-y-180' : ''}
                      `}>
                        {/* Front */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a23] to-[#121217] rounded-3xl border border-slate-800 flex flex-col items-center justify-center p-8 backface-hidden shadow-2xl">
                          <div className="absolute top-6 left-6 flex items-center gap-2">
                            <BrainCircuit className="w-5 h-5 text-indigo-500" />
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Word #{filteredVocab[currentCardIndex].id}</span>
                          </div>
                          <h2 className="text-4xl font-extrabold text-center text-white tracking-tight leading-tight">{filteredVocab[currentCardIndex].term}</h2>
                          {filteredVocab[currentCardIndex].weekId && (
                            <div className="text-xs text-slate-400 mt-2">Woche {filteredVocab[currentCardIndex].weekId} — {filteredVocab[currentCardIndex].weekTitle}</div>
                          )}
                          <p className="mt-8 text-xs text-slate-500 animate-pulse">Click to reveal definition</p>
                        </div>

                        {/* Back */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-slate-900 rounded-3xl border border-indigo-500/30 flex flex-col items-center justify-center p-8 backface-hidden rotate-y-180 shadow-2xl overflow-hidden">
                           <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-600/10 blur-[80px]" />
                           <div className="text-center space-y-6">
                              <div>
                                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Definition</p>
                                <p className="text-xl font-bold text-white px-4">{filteredVocab[currentCardIndex].definition}</p>
                              </div>
                              <div className="max-w-xs">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Beispiel</p>
                                <p className="text-sm text-slate-300 italic">"{filteredVocab[currentCardIndex].example}"</p>
                              </div>
                              <span className="inline-block px-3 py-1 rounded bg-slate-800 text-[10px] font-bold text-slate-400 border border-slate-700">
                                {filteredVocab[currentCardIndex].info}
                              </span>
                           </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        Card <span className="text-indigo-400">{currentCardIndex + 1}</span> of {filteredVocab.length}
                      </div>
                      <div className="flex gap-4">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handlePrevCard(); }}
                          className="w-12 h-12 rounded-full border border-slate-700 bg-slate-800/50 flex items-center justify-center hover:bg-slate-700 transition-colors"
                        >
                          <ChevronRight className="w-5 h-5 rotate-180" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleNextCard(); }}
                          className="w-12 h-12 rounded-full border border-indigo-500/50 bg-indigo-600/20 flex items-center justify-center hover:bg-indigo-600/40 transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                   <div className="text-center py-20">No cards available.</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="px-6 py-4 border-t border-slate-800/50 bg-[#0a0a0c] flex items-center justify-between text-[10px] text-slate-500 uppercase font-bold tracking-widest">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> 16 Weeks Sprint</span>
            <span className="flex items-center gap-1.5"><BookOpen className="w-3 h-3" /> C1 Level Mastery</span>
          </div>
          <div className="flex items-center gap-2">
            Status: <span className="text-emerald-500 flex items-center gap-1">Live <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /></span>
          </div>
        </footer>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 { perspective: 1000px; }
        .backface-hidden { backface-visibility: hidden; }
        .transform-style-3d { transform-style: preserve-3d; }
        .rotate-y-180 { transform: rotateY(180deg); }
        
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
}