import { BaseTransformer } from "transformer.base"


export class ProfileTransformer extends BaseTransformer {
    static singleTransform(profile) {
        return {
            id: profile.id, // Mengubah ObjectId menjadi string
            displayName: profile.displayName,
            gender: profile.gender,
            birthday: profile.birthday,
            horoscope: profile.horoscope,
            zodiac: profile.zodiac,
            height: profile.height,
            weight: profile.weight,
            interest: profile.interest,
            profilePictureURL: profile.profilePictureURL
        }
    }
}