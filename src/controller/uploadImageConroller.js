const { createClient } = require('@supabase/supabase-js')
const { supabaseUrl, supabaseKey, supabaseBucketName } = require('../config/config')
const supabase = createClient(supabaseUrl, supabaseKey)
const fs = require('fs')

exports.uploadImage = async (fileName, filePath) => {
    const { error } = await supabase.storage
        .from(supabaseBucketName)
        .upload(fileName, fs.readFileSync(filePath));
    if (error) {
        fs.unlinkSync(filePath)
        throw error
    }
};

exports.getImageUrl = async (fileName, filePath) => {
    const { data, error } = supabase.storage
        .from(supabaseBucketName)
        .getPublicUrl(fileName);
    if (error) {
        fs.unlinkSync(filePath)
        throw error
    }
    else {
        return data;
    }
};

exports.deleteImage = async (fileName) => {
    const { error } = supabase.storage
        .from(supabaseBucketName)
        .remove(supabaseBucketName + fileName);
    if (error) {
        throw error
    }
};
