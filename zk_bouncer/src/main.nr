use dep::zkemail::verify_email;
use dep::zkemail::dkim::RSAPubkey;
use dep::zkemail::Sequence;
use dep::zkemail::KEY_LIMBS_2048;

use dep::std::{hash::pedersen_hash, collections::bounded_vec::BoundedVec};
use zkemail::headers::email_address::get_email_address;

global MAX_EMAIL_HEADER_LENGTH = 512;
global MAX_EMAIL_ADDRESS_LENGTH = 320;
global MAX_EMAIL_BODY_LENGTH: u32 = 1024;
fn main(header: BoundedVec<u8, MAX_EMAIL_HEADER_LENGTH>, pubkey: RSAPubkey<KEY_LIMBS_2048>, signature: [Field; KEY_LIMBS_2048], expected_to_address: BoundedVec<u8, MAX_EMAIL_ADDRESS_LENGTH>, body: BoundedVec<u8, MAX_EMAIL_BODY_LENGTH>, to_address_seq: Sequence, header_field_sequence: Sequence) {
    
    // Verify dkim signature to prove the authenticity
    verify_email(header, pubkey, signature);

    let header_field_name = "to".as_bytes();
    // extract actual mail_address from the header
    let actual_to_address = get_email_address(header, header_field_sequence, to_address_seq, header_field_name);

    assert_eq(expected_to_address, actual_to_address);
}