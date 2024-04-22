export class ZodiacSignLibrary {
    private readonly zodiacSigns: string[] = [
      "Aries",
      "Taurus",
      "Gemini",
      "Cancer",
      "Leo",
      "Virgo",
      "Libra",
      "Scorpio",
      "Sagittarius",
      "Capricorn",
      "Aquarius",
      "Pisces",
    ];
  
    private readonly chineseZodiacSigns: string[] = [
      "Rat",
      "Ox",
      "Tiger",
      "Rabbit",
      "Dragon",
      "Snake",
      "Horse",
      "Goat",
      "Monkey",
      "Rooster",
      "Dog",
      "Pig",
    ];
  
    public getZodiacSign(birthDate: Date): string {
      if (isNaN(birthDate.getTime())) {
        throw new Error("Invalid birth date. Please provide a valid Date object.");
      }
  
      const month = birthDate.getMonth();
      const day = birthDate.getDate();
  
      if (month === 0) {
        return day >= 20 ? this.zodiacSigns[11] : this.zodiacSigns[0];
      } else {
        return this.zodiacSigns[month - 1];
      }
    }
  
    public getChineseZodiacSign(birthDate: Date): string {
      if (isNaN(birthDate.getTime())) {
        throw new Error("Invalid birth date. Please provide a valid Date object.");
      }
  
      const year = birthDate.getFullYear();
      const chineseYear = year - (year % 12);
  
      return this.chineseZodiacSigns[chineseYear % 12];
    }
  }
  