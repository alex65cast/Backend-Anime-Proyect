import Users, { USER_ROLS } from '../user/model.js';
import Quote from './model.js';

export const createQuote = async (newQuote, token) => {
    if(!newQuote.quote) throw new Error("INFO_LEFT")
    if(token.rol === USER_ROLS.CLIENT) {
        if(!newQuote.dentist) throw new Error("INFO_LEFT")
        newQuote.customer = token.id
    }
    if(token.rol === USER_ROLS.DENTIST) {
        if(!newQuote.customer) throw new Error("INFO_LEFT")
        newQuote.dentist = token.id
    }
    if(token.rol === USER_ROLS.ADMIN && (!newQuote.customer || !newQuote.dentist)) throw new Error("INFO_LEFT")
    newQuote.dateOfQuote = new Date(newQuote.dateOfQuote)
    newQuote.endOfQuote = new Date(newQuote.endOfQuote)
    if((await checkQuoteConcur(newQuote.dateOfQuote,newQuote.endOfQuote,newQuote.dentist, newQuote.customer)).length !== 0) {
        throw new Error('CANT_CREATE_QUOTE')
    }
    let quote = new Quote(newQuote)
    await quote.save()
    return quote
}

const checkQuoteConcur = async(dateStart, dateEnd, dentistQuote, customerQuote) => {
    return await Quote.find({$and: [{$or: [{dentist: dentistQuote}, {customer: customerQuote}]}, 
        {$or:[{$and: [{dateOfQuote: {$lte: dateStart}}, {endOfQuote: {$gte: dateStart}}]},{$and: [{dateOfQuote: {$lte: dateEnd}}, {endOfQuote: {$gte: dateEnd}}]}]}, 
        {activeQuote: true}]})
}

export const modifiedQuote = async (quoteId,newQuote, token) => {
    if(!quoteId || !newQuote || !token) throw new Error("INFO_LEFT")
    let quote = await Quote.findOne({_id: quoteId})
    if(!quote) throw new Error("NO_QUOTE")
    if(token.rol === USER_ROLS.ADMIN || ((token.rol === USER_ROLS.CLIENT || token.rol === USER_ROLS.DENTIST) && (quote.customer?.toString() === token.id || quote.dentist?.toString() === token.id))) {
        newQuote.updateAt = new Date()
        if(newQuote.activeQuote === true) newQuote.deletedAt = null
        if(newQuote.activeQuote === true && (await checkQuoteConcur(newQuote.dateOfQuote,newQuote.endOfQuote,newQuote.dentist, newQuote.customer)).length !== 0) throw new Error('CANT_CREATE_QUOTE')
        quote = await Quote.findOneAndUpdate({_id: quoteId}, newQuote, {new: true}).populate([{path: 'customer', select: ['name', 'email']}, {path: 'dentist', select: ['name', 'email']}])
        return quote
    } else {
        throw new Error("NOT_AUTHORIZED")
    }
}

export const deleteQuote = async (quoteId, token, req) => {
    if(!quoteId || !token || !req) throw new Error("INFO_LEFT")
    let quote = await Quote.findOne({_id: quoteId})
    if(!quote) throw new Error("NO_QUOTE")
    if(token.rol === USER_ROLS.ADMIN || ((token.rol === USER_ROLS.CLIENT || token.rol === USER_ROLS.DENTIST) && (quote.customer?.toString() === token.id || quote.dentist?.toString() === token.id))) {
        req.updateAt = new Date()
        req.deletedAt = new Date()
        req.activeQuote = false
        quote = await Quote.findOneAndUpdate({_id: quoteId}, req, {new: true}).populate([{path: 'customer', select: ['name', 'email']}, {path: 'dentist', select: ['name', 'email']}])
        return quote
    } else {
        throw new Error("NOT_AUTHORIZED")
    }
}

// export const getQuotes = async(query, token) => {
//     if(Object.keys(query).length === 0) {
//         if(token.rol === USER_ROLS.CLIENT) await Quote.find({customer: token.id, activeQuote: true}).populate([{path: 'customer', select: ['name', 'email']}, {path: 'dentist', select: ['name', 'email']}])
//         if(token.rol === USER_ROLS.DENTIST) await Quote.find({dentist: token.id, activeQuote: true}).populate([{path: 'customer', select: ['name', 'email']}, {path: 'dentist', select: ['name', 'email']}])
//         return await Quote.find({})
//     } else {
//         const dateOfQuoteQ = !!query.dateOfQuote ? new Date(query.dateOfQuote.split('-')) : undefined
//         const endOfQuoteQ = !!query.endOfQuote ? new Date(query.endOfQuote.split('-')) : undefined
//         return await Quote.find({$and: [token.rol === USER_ROLS.CLIENT ? {customer: token.id} : token.rol === USER_ROLS.DENTIST ? {dentist: token.id} : {},
//                                 {$and: [!!dateOfQuoteQ ? {dateOfQuote: {$gt: dateOfQuoteQ}} : {}, !!endOfQuoteQ ? {endOfQuote: {$lt: endOfQuoteQ}} : {}]},
//                                 token.rol === USER_ROLS.ADMIN ? {} : {deletedAt: null}]}, {customer: 1, dentist: 1, quote:1, dateOfQuote:1, endOfQuote:1})
//                                 .populate([{path: 'customer', select: ['name', 'email']}, {path: 'dentist', select: ['name', 'email']}])
//     }
// }

export const getQuotes = async(query, token) => {
    if (Object.keys(query).length === 0) {
      if (token.rol === USER_ROLS.CLIENT) {
        return await Quote.find({ customer: token.id, activeQuote: true })
          .populate([{ path: 'customer', select: ['name', 'email'] }, { path: 'dentist', select: ['name', 'email'] }]);
      }
      if (token.rol === USER_ROLS.DENTIST) {
        return await Quote.find({ dentist: token.id, activeQuote: true })
          .populate([{ path: 'customer', select: ['name', 'email'] }, { path: 'dentist', select: ['name', 'email'] }]);
      }
      if (token.rol === USER_ROLS.ADMIN) {
        return await Quote.find({}) // Devuelve todos los quotes
          .populate([{ path: 'customer', select: ['name', 'email'] }, { path: 'dentist', select: ['name', 'email'] }]);
      }
      return await Quote.find({});
    } else {
      const dateOfQuoteQ = !!query.dateOfQuote ? new Date(query.dateOfQuote.split('-')) : undefined;
      const endOfQuoteQ = !!query.endOfQuote ? new Date(query.endOfQuote.split('-')) : undefined;
      const filter = {
        $and: [
          token.rol === USER_ROLS.CLIENT ? { customer: token.id } :
          token.rol === USER_ROLS.DENTIST ? { dentist: token.id } : {},
          {
            $and: [
              !!dateOfQuoteQ ? { dateOfQuote: { $gt: dateOfQuoteQ } } : {},
              !!endOfQuoteQ ? { endOfQuote: { $lt: endOfQuoteQ } } : {}
            ]
          },
          token.rol === USER_ROLS.ADMIN ? {} : { deletedAt: null }
        ]
      };
      return await Quote.find(filter, { customer: 1, dentist: 1, quote: 1, dateOfQuote: 1, endOfQuote: 1 })
        .populate([{ path: 'customer', select: ['name', 'email'] }, { path: 'dentist', select: ['name', 'email'] }]);
    }
  };
  

export const getQuotesId = async(id, token) => {
    const quote = await Quote.findOne({_id: id}).populate([{path: 'customer', select: ['name', 'email']}, {path: 'dentist', select: ['name', 'email']}])
    if(!quote) throw new Error('NO_QUOTE')
    if(token.rol === USER_ROLS.CLIENT ? token.id !== quote.customer.toString() : token.rol === USER_ROLS.DENTIST ? token.id !== quote.dentist.toString() : false) throw new Error('NO_AUTH')
    return quote
}