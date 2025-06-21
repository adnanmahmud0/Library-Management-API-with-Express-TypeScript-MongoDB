import { Document, model, Schema, Model } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BookModel extends Model<IBook> {
  updateAvailability(bookId: string): Promise<void>;
}

const bookSchema = new Schema<IBook>(
  {

    title: 
    { 
        type: String, 
        required: true, 
        trim: true 
    },

    author: 
    { 
        type: String, 
        required: true, 
        trim: true 
    },

    genre: 
    {
      type: String,
      required: true,
      enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
    },

    isbn: 
    { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
    },

    description: 
    { 
        type: String, 
        trim: true 
    },

    copies: 
    { 
        type: Number, 
        required: true, 
        min: [0, 'Copies must be a positive number'] 
    },

    available: 
    { 
        type: Boolean, 
        default: true 
    },
  },
  {
    timestamps: true,

    versionKey: false,
  }
);


bookSchema.statics.updateAvailability = async function (bookId: string) {
  const book = await this.findById(bookId);
  if (!book) return;
  if (book.copies <= 0 && book.available) {
    book.available = false;
    await book.save();
  }
};

export const Book = model<IBook, BookModel>("Book", bookSchema);
