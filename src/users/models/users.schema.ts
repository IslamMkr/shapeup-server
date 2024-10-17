import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Sexe } from 'src/users/models/users.dto';

@Schema()
class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, minlength: 2, maxlength: 30 })
    firstname: string;

    @Prop({ required: true, minlength: 2, maxlength: 30 })
    lastname: string;

    @Prop({ required: true, type: Date, min: new Date('1950-01-01') })
    dateOfBirth: Date;

    @Prop({ required: true, enum: Sexe })
    sexe: Sexe;

    @Prop({ required: true, type: Number, min: 30, max: 500 })
    weight: number;

    @Prop({ required: true, type: Number, min: 50, max: 300 })
    height: number;

    @Prop({ required: true, type: Date })
    createdAt: Date;

    @Prop({ type: Date })
    updatedAt?: Date;
}

type UserDocument = HydratedDocument<User>;

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.virtual('age').get(function (this: User) {
    return new Date(Date.now()).getFullYear() - this.dateOfBirth.getFullYear();
});
UserSchema.virtual('fullname').get(function (this: User) {
    return `${this.firstname} ${this.lastname}`;
});

export { User, UserDocument, UserSchema };
